"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkProvider = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const cxapi = __importStar(require("@aws-cdk/cx-api"));
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs-extra"));
const logging_1 = require("../../logging");
const functions_1 = require("../../util/functions");
const credential_plugins_1 = require("../aws-auth/credential-plugins");
const awscli_compatible_1 = require("./awscli-compatible");
const sdk_1 = require("./sdk");
// Some configuration that can only be achieved by setting
// environment variables.
process.env.AWS_STS_REGIONAL_ENDPOINTS = 'regional';
process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = '1';
const CACHED_ACCOUNT = Symbol('cached_account');
const CACHED_DEFAULT_CREDENTIALS = Symbol('cached_default_credentials');
/**
 * Creates instances of the AWS SDK appropriate for a given account/region.
 *
 * Behavior is as follows:
 *
 * - First, a set of "base" credentials are established
 *   - If a target environment is given and the default ("current") SDK credentials are for
 *     that account, return those; otherwise
 *   - If a target environment is given, scan all credential provider plugins
 *     for credentials, and return those if found; otherwise
 *   - Return default ("current") SDK credentials, noting that they might be wrong.
 *
 * - Second, a role may optionally need to be assumed. Use the base credentials
 *   established in the previous process to assume that role.
 *   - If assuming the role fails and the base credentials are for the correct
 *     account, return those. This is a fallback for people who are trying to interact
 *     with a Default Synthesized stack and already have right credentials setup.
 *
 *     Typical cases we see in the wild:
 *     - Credential plugin setup that, although not recommended, works for them
 *     - Seeded terminal with `ReadOnly` credentials in order to do `cdk diff`--the `ReadOnly`
 *       role doesn't have `sts:AssumeRole` and will fail for no real good reason.
 */
class SdkProvider {
    constructor(defaultChain, 
    /**
     * Default region
     */
    defaultRegion, sdkOptions = {}) {
        this.defaultChain = defaultChain;
        this.defaultRegion = defaultRegion;
        this.sdkOptions = sdkOptions;
        this.plugins = new credential_plugins_1.CredentialPlugins();
    }
    /**
     * Create a new SdkProvider which gets its defaults in a way that behaves like the AWS CLI does
     *
     * The AWS SDK for JS behaves slightly differently from the AWS CLI in a number of ways; see the
     * class `AwsCliCompatible` for the details.
     */
    static async withAwsCliCompatibleDefaults(options = {}) {
        const sdkOptions = parseHttpOptions(options.httpOptions ?? {});
        const chain = await awscli_compatible_1.AwsCliCompatible.credentialChain({
            profile: options.profile,
            ec2instance: options.ec2creds,
            containerCreds: options.containerCreds,
            httpOptions: sdkOptions.httpOptions,
        });
        const region = await awscli_compatible_1.AwsCliCompatible.region({
            profile: options.profile,
            ec2instance: options.ec2creds,
        });
        return new SdkProvider(chain, region, sdkOptions);
    }
    /**
     * Return an SDK which can do operations in the given environment
     *
     * The `environment` parameter is resolved first (see `resolveEnvironment()`).
     */
    async forEnvironment(environment, mode, options) {
        const env = await this.resolveEnvironment(environment);
        const baseCreds = await this.obtainBaseCredentials(env.account, mode);
        // At this point, we need at least SOME credentials
        if (baseCreds.source === 'none') {
            throw new Error(fmtObtainCredentialsError(env.account, baseCreds));
        }
        // Simple case is if we don't need to "assumeRole" here. If so, we must now have credentials for the right
        // account.
        if (options?.assumeRoleArn === undefined) {
            if (baseCreds.source === 'incorrectDefault') {
                throw new Error(fmtObtainCredentialsError(env.account, baseCreds));
            }
            return { sdk: new sdk_1.SDK(baseCreds.credentials, env.region, this.sdkOptions), didAssumeRole: false };
        }
        // We will proceed to AssumeRole using whatever we've been given.
        const sdk = await this.withAssumedRole(baseCreds, options.assumeRoleArn, options.assumeRoleExternalId, env.region);
        // Exercise the AssumeRoleCredentialsProvider we've gotten at least once so
        // we can determine whether the AssumeRole call succeeds or not.
        try {
            await sdk.forceCredentialRetrieval();
            return { sdk, didAssumeRole: true };
        }
        catch (e) {
            // AssumeRole failed. Proceed and warn *if and only if* the baseCredentials were already for the right account
            // or returned from a plugin. This is to cover some current setups for people using plugins or preferring to
            // feed the CLI credentials which are sufficient by themselves. Prefer to assume the correct role if we can,
            // but if we can't then let's just try with available credentials anyway.
            if (baseCreds.source === 'correctDefault' || baseCreds.source === 'plugin') {
                (0, logging_1.debug)(e.message);
                (0, logging_1.warning)(`${fmtObtainedCredentials(baseCreds)} could not be used to assume '${options.assumeRoleArn}', but are for the right account. Proceeding anyway.`);
                return { sdk: new sdk_1.SDK(baseCreds.credentials, env.region, this.sdkOptions), didAssumeRole: false };
            }
            throw e;
        }
    }
    /**
     * Return the partition that base credentials are for
     *
     * Returns `undefined` if there are no base credentials.
     */
    async baseCredentialsPartition(environment, mode) {
        const env = await this.resolveEnvironment(environment);
        const baseCreds = await this.obtainBaseCredentials(env.account, mode);
        if (baseCreds.source === 'none') {
            return undefined;
        }
        return (await new sdk_1.SDK(baseCreds.credentials, env.region, this.sdkOptions).currentAccount()).partition;
    }
    /**
     * Resolve the environment for a stack
     *
     * Replaces the magic values `UNKNOWN_REGION` and `UNKNOWN_ACCOUNT`
     * with the defaults for the current SDK configuration (`~/.aws/config` or
     * otherwise).
     *
     * It is an error if `UNKNOWN_ACCOUNT` is used but the user hasn't configured
     * any SDK credentials.
     */
    async resolveEnvironment(env) {
        const region = env.region !== cxapi.UNKNOWN_REGION ? env.region : this.defaultRegion;
        const account = env.account !== cxapi.UNKNOWN_ACCOUNT ? env.account : (await this.defaultAccount())?.accountId;
        if (!account) {
            throw new Error('Unable to resolve AWS account to use. It must be either configured when you define your CDK Stack, or through the environment');
        }
        return {
            region,
            account,
            name: cxapi.EnvironmentUtils.format(account, region),
        };
    }
    /**
     * The account we'd auth into if we used default credentials.
     *
     * Default credentials are the set of ambiently configured credentials using
     * one of the environment variables, or ~/.aws/credentials, or the *one*
     * profile that was passed into the CLI.
     *
     * Might return undefined if there are no default/ambient credentials
     * available (in which case the user should better hope they have
     * credential plugins configured).
     *
     * Uses a cache to avoid STS calls if we don't need 'em.
     */
    defaultAccount() {
        return (0, functions_1.cached)(this, CACHED_ACCOUNT, async () => {
            try {
                const creds = await this.defaultCredentials();
                const accessKeyId = creds.accessKeyId;
                if (!accessKeyId) {
                    throw new Error('Unable to resolve AWS credentials (setup with "aws configure")');
                }
                return await new sdk_1.SDK(creds, this.defaultRegion, this.sdkOptions).currentAccount();
            }
            catch (e) {
                (0, logging_1.debug)('Unable to determine the default AWS account:', e);
                return undefined;
            }
        });
    }
    /**
     * Get credentials for the given account ID in the given mode
     *
     * 1. Use the default credentials if the destination account matches the
     *    current credentials' account.
     * 2. Otherwise try all credential plugins.
     * 3. Fail if neither of these yield any credentials.
     * 4. Return a failure if any of them returned credentials
     */
    async obtainBaseCredentials(accountId, mode) {
        // First try 'current' credentials
        const defaultAccountId = (await this.defaultAccount())?.accountId;
        if (defaultAccountId === accountId) {
            return { source: 'correctDefault', credentials: await this.defaultCredentials() };
        }
        // Then try the plugins
        const pluginCreds = await this.plugins.fetchCredentialsFor(accountId, mode);
        if (pluginCreds) {
            return { source: 'plugin', ...pluginCreds };
        }
        // Fall back to default credentials with a note that they're not the right ones yet
        if (defaultAccountId !== undefined) {
            return {
                source: 'incorrectDefault',
                accountId: defaultAccountId,
                credentials: await this.defaultCredentials(),
                unusedPlugins: this.plugins.availablePluginNames,
            };
        }
        // Apparently we didn't find any at all
        return {
            source: 'none',
            unusedPlugins: this.plugins.availablePluginNames,
        };
    }
    /**
     * Resolve the default chain to the first set of credentials that is available
     */
    defaultCredentials() {
        return (0, functions_1.cached)(this, CACHED_DEFAULT_CREDENTIALS, () => {
            (0, logging_1.debug)('Resolving default credentials');
            return this.defaultChain.resolvePromise();
        });
    }
    /**
     * Return an SDK which uses assumed role credentials
     *
     * The base credentials used to retrieve the assumed role credentials will be the
     * same credentials returned by obtainCredentials if an environment and mode is passed,
     * otherwise it will be the current credentials.
     */
    async withAssumedRole(masterCredentials, roleArn, externalId, region) {
        (0, logging_1.debug)(`Assuming role '${roleArn}'.`);
        region = region ?? this.defaultRegion;
        const creds = new AWS.ChainableTemporaryCredentials({
            params: {
                RoleArn: roleArn,
                ...externalId ? { ExternalId: externalId } : {},
                RoleSessionName: `aws-cdk-${safeUsername()}`,
            },
            stsConfig: {
                region,
                ...this.sdkOptions,
            },
            masterCredentials: masterCredentials.credentials,
        });
        return new sdk_1.SDK(creds, region, this.sdkOptions, {
            assumeRoleCredentialsSourceDescription: fmtObtainedCredentials(masterCredentials),
        });
    }
}
exports.SdkProvider = SdkProvider;
const DEFAULT_CONNECTION_TIMEOUT = 10000;
const DEFAULT_TIMEOUT = 300000;
/**
 * Get HTTP options for the SDK
 *
 * Read from user input or environment variables.
 *
 * Returns a complete `ConfigurationOptions` object because that's where
 * `customUserAgent` lives, but `httpOptions` is the most important attribute.
 */
function parseHttpOptions(options) {
    const config = {};
    config.httpOptions = {};
    config.httpOptions.connectTimeout = DEFAULT_CONNECTION_TIMEOUT;
    config.httpOptions.timeout = DEFAULT_TIMEOUT;
    let userAgent = options.userAgent;
    if (userAgent == null) {
        // Find the package.json from the main toolkit
        const pkg = JSON.parse(readIfPossible(path.join(__dirname, '..', '..', '..', 'package.json')) ?? '{}');
        userAgent = `${pkg.name}/${pkg.version}`;
    }
    config.customUserAgent = userAgent;
    const caBundlePath = options.caBundlePath || caBundlePathFromEnvironment();
    if (caBundlePath) {
        (0, logging_1.debug)('Using CA bundle path: %s', caBundlePath);
        config.httpOptions.ca = readIfPossible(caBundlePath);
    }
    if (options.proxyAddress) {
        (0, logging_1.debug)('Proxy server from command-line arguments: %s', options.proxyAddress);
    }
    // Configure the proxy agent. By default, this will use HTTPS?_PROXY and
    // NO_PROXY environment variables to determine which proxy to use for each
    // request.
    //
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ProxyAgent = require('proxy-agent');
    config.httpOptions.agent = new ProxyAgent(options.proxyAddress);
    return config;
}
/**
 * Find and return a CA certificate bundle path to be passed into the SDK.
 */
function caBundlePathFromEnvironment() {
    if (process.env.aws_ca_bundle) {
        return process.env.aws_ca_bundle;
    }
    if (process.env.AWS_CA_BUNDLE) {
        return process.env.AWS_CA_BUNDLE;
    }
    return undefined;
}
/**
 * Read a file if it exists, or return undefined
 *
 * Not async because it is used in the constructor
 */
function readIfPossible(filename) {
    try {
        if (!fs.pathExistsSync(filename)) {
            return undefined;
        }
        return fs.readFileSync(filename, { encoding: 'utf-8' });
    }
    catch (e) {
        (0, logging_1.debug)(e);
        return undefined;
    }
}
/**
 * Return the username with characters invalid for a RoleSessionName removed
 *
 * @see https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole_RequestParameters
 */
function safeUsername() {
    return os.userInfo().username.replace(/[^\w+=,.@-]/g, '@');
}
/**
 * Isolating the code that translates calculation errors into human error messages
 *
 * We cover the following cases:
 *
 * - No credentials are available at all
 * - Default credentials are for the wrong account
 */
function fmtObtainCredentialsError(targetAccountId, obtainResult) {
    const msg = [`Need to perform AWS calls for account ${targetAccountId}`];
    switch (obtainResult.source) {
        case 'incorrectDefault':
            msg.push(`but the current credentials are for ${obtainResult.accountId}`);
            break;
        case 'none':
            msg.push('but no credentials have been configured');
    }
    if (obtainResult.unusedPlugins.length > 0) {
        msg.push(`and none of these plugins found any: ${obtainResult.unusedPlugins.join(', ')}`);
    }
    return msg.join(', ');
}
/**
 * Format a message indicating where we got base credentials for the assume role
 *
 * We cover the following cases:
 *
 * - Default credentials for the right account
 * - Default credentials for the wrong account
 * - Credentials returned from a plugin
 */
function fmtObtainedCredentials(obtainResult) {
    switch (obtainResult.source) {
        case 'correctDefault':
            return 'current credentials';
        case 'plugin':
            return `credentials returned by plugin '${obtainResult.pluginName}'`;
        case 'incorrectDefault':
            const msg = [];
            msg.push(`current credentials (which are for account ${obtainResult.accountId}`);
            if (obtainResult.unusedPlugins.length > 0) {
                msg.push(`, and none of the following plugins provided credentials: ${obtainResult.unusedPlugins.join(', ')}`);
            }
            msg.push(')');
            return msg.join('');
    }
}
