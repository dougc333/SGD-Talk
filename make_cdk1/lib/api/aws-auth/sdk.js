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
exports.SDK = void 0;
const AWS = __importStar(require("aws-sdk"));
const logging_1 = require("../../logging");
const functions_1 = require("../../util/functions");
const account_cache_1 = require("./account-cache");
// We need to map regions to domain suffixes, and the SDK already has a function to do this.
// It's not part of the public API, but it's also unlikely to go away.
//
// Reuse that function, and add a safety check so we don't accidentally break if they ever
// refactor that away.
/* eslint-disable @typescript-eslint/no-require-imports */
const regionUtil = require('aws-sdk/lib/region_config');
/* eslint-enable @typescript-eslint/no-require-imports */
if (!regionUtil.getEndpointSuffix) {
    throw new Error('This version of AWS SDK for JS does not have the \'getEndpointSuffix\' function!');
}
/**
 * Base functionality of SDK without credential fetching
 */
class SDK {
    constructor(_credentials, region, httpOptions = {}, sdkOptions = {}) {
        this._credentials = _credentials;
        this.sdkOptions = sdkOptions;
        /**
         * Default retry options for SDK clients.
         */
        this.retryOptions = { maxRetries: 6, retryDelayOptions: { base: 300 } };
        /**
         * The more generous retry policy for CloudFormation, which has a 1 TPM limit on certain APIs,
         * which are abundantly used for deployment tracking, ...
         *
         * So we're allowing way more retries, but waiting a bit more.
         */
        this.cloudFormationRetryOptions = { maxRetries: 10, retryDelayOptions: { base: 1000 } };
        this.config = {
            ...httpOptions,
            ...this.retryOptions,
            credentials: _credentials,
            region,
            logger: { log: (...messages) => messages.forEach(m => (0, logging_1.trace)('%s', m)) },
        };
        this.currentRegion = region;
    }
    appendCustomUserAgent(userAgentData) {
        if (!userAgentData) {
            return;
        }
        const currentCustomUserAgent = this.config.customUserAgent;
        this.config.customUserAgent = currentCustomUserAgent
            ? `${currentCustomUserAgent} ${userAgentData}`
            : userAgentData;
    }
    removeCustomUserAgent(userAgentData) {
        this.config.customUserAgent = this.config.customUserAgent?.replace(userAgentData, '');
    }
    lambda() {
        return this.wrapServiceErrorHandling(new AWS.Lambda(this.config));
    }
    cloudFormation() {
        return this.wrapServiceErrorHandling(new AWS.CloudFormation({
            ...this.config,
            ...this.cloudFormationRetryOptions,
        }));
    }
    ec2() {
        return this.wrapServiceErrorHandling(new AWS.EC2(this.config));
    }
    ssm() {
        return this.wrapServiceErrorHandling(new AWS.SSM(this.config));
    }
    s3() {
        return this.wrapServiceErrorHandling(new AWS.S3(this.config));
    }
    route53() {
        return this.wrapServiceErrorHandling(new AWS.Route53(this.config));
    }
    ecr() {
        return this.wrapServiceErrorHandling(new AWS.ECR(this.config));
    }
    ecs() {
        return this.wrapServiceErrorHandling(new AWS.ECS(this.config));
    }
    elbv2() {
        return this.wrapServiceErrorHandling(new AWS.ELBv2(this.config));
    }
    secretsManager() {
        return this.wrapServiceErrorHandling(new AWS.SecretsManager(this.config));
    }
    kms() {
        return this.wrapServiceErrorHandling(new AWS.KMS(this.config));
    }
    stepFunctions() {
        return this.wrapServiceErrorHandling(new AWS.StepFunctions(this.config));
    }
    codeBuild() {
        return this.wrapServiceErrorHandling(new AWS.CodeBuild(this.config));
    }
    cloudWatchLogs() {
        return this.wrapServiceErrorHandling(new AWS.CloudWatchLogs(this.config));
    }
    async currentAccount() {
        // Get/refresh if necessary before we can access `accessKeyId`
        await this.forceCredentialRetrieval();
        return (0, functions_1.cached)(this, CURRENT_ACCOUNT_KEY, () => SDK.accountCache.fetch(this._credentials.accessKeyId, async () => {
            // if we don't have one, resolve from STS and store in cache.
            (0, logging_1.debug)('Looking up default account ID from STS');
            const result = await new AWS.STS(this.config).getCallerIdentity().promise();
            const accountId = result.Account;
            const partition = result.Arn.split(':')[1];
            if (!accountId) {
                throw new Error('STS didn\'t return an account ID');
            }
            (0, logging_1.debug)('Default account ID:', accountId);
            return { accountId, partition };
        }));
    }
    /**
     * Return the current credentials
     *
     * Don't use -- only used to write tests around assuming roles.
     */
    async currentCredentials() {
        await this.forceCredentialRetrieval();
        return this._credentials;
    }
    /**
     * Force retrieval of the current credentials
     *
     * Relevant if the current credentials are AssumeRole credentials -- do the actual
     * lookup, and translate any error into a useful error message (taking into
     * account credential provenance).
     */
    async forceCredentialRetrieval() {
        try {
            await this._credentials.getPromise();
        }
        catch (e) {
            (0, logging_1.debug)(`Assuming role failed: ${e.message}`);
            throw new Error([
                'Could not assume role in target account',
                ...this.sdkOptions.assumeRoleCredentialsSourceDescription
                    ? [`using ${this.sdkOptions.assumeRoleCredentialsSourceDescription}`]
                    : [],
                e.message,
                '. Please make sure that this role exists in the account. If it doesn\'t exist, (re)-bootstrap the environment ' +
                    'with the right \'--trust\', using the latest version of the CDK CLI.',
            ].join(' '));
        }
    }
    getEndpointSuffix(region) {
        return regionUtil.getEndpointSuffix(region);
    }
    /**
     * Return a wrapping object for the underlying service object
     *
     * Responds to failures in the underlying service calls, in two different
     * ways:
     *
     * - When errors are encountered, log the failing call and the error that
     *   it triggered (at debug level). This is necessary because the lack of
     *   stack traces in NodeJS otherwise makes it very hard to suss out where
     *   a certain AWS error occurred.
     * - The JS SDK has a funny business of wrapping any credential-based error
     *   in a super-generic (and in our case wrong) exception. If we then use a
     *   'ChainableTemporaryCredentials' and the target role doesn't exist,
     *   the error message that shows up by default is super misleading
     *   (https://github.com/aws/aws-sdk-js/issues/3272). We can fix this because
     *   the exception contains the "inner exception", so we unwrap and throw
     *   the correct error ("cannot assume role").
     *
     * The wrapping business below is slightly more complicated than you'd think
     * because we must hook into the `promise()` method of the object that's being
     * returned from the methods of the object that we wrap, so there's two
     * levels of wrapping going on, and also some exceptions to the wrapping magic.
     */
    wrapServiceErrorHandling(serviceObject) {
        const classObject = serviceObject.constructor.prototype;
        const self = this;
        return new Proxy(serviceObject, {
            get(obj, prop) {
                const real = obj[prop];
                // Things we don't want to intercept:
                // - Anything that's not a function.
                // - 'constructor', s3.upload() will use this to do some magic and we need the underlying constructor.
                // - Any method that's not on the service class (do not intercept 'makeRequest' and other helpers).
                if (prop === 'constructor' || !classObject.hasOwnProperty(prop) || !isFunction(real)) {
                    return real;
                }
                // NOTE: This must be a function() and not an () => {
                // because I need 'this' to be dynamically bound and not statically bound.
                // If your linter complains don't listen to it!
                return function () {
                    // Call the underlying function. If it returns an object with a promise()
                    // method on it, wrap that 'promise' method.
                    const args = [].slice.call(arguments, 0);
                    const response = real.apply(this, args);
                    // Don't intercept unless the return value is an object with a '.promise()' method.
                    if (typeof response !== 'object' || !response) {
                        return response;
                    }
                    if (!('promise' in response)) {
                        return response;
                    }
                    // Return an object with the promise method replaced with a wrapper which will
                    // do additional things to errors.
                    return Object.assign(Object.create(response), {
                        promise() {
                            return response.promise().catch((e) => {
                                e = self.makeDetailedException(e);
                                (0, logging_1.debug)(`Call failed: ${prop}(${JSON.stringify(args[0])}) => ${e.message} (code=${e.code})`);
                                return Promise.reject(e); // Re-'throw' the new error
                            });
                        },
                    });
                };
            },
        });
    }
    /**
     * Extract a more detailed error out of a generic error if we can
     *
     * If this is an error about Assuming Roles, add in the context showing the
     * chain of credentials we used to try to assume the role.
     */
    makeDetailedException(e) {
        // This is the super-generic "something's wrong" error that the JS SDK wraps other errors in.
        // https://github.com/aws/aws-sdk-js/blob/f0ac2e53457c7512883d0677013eacaad6cd8a19/lib/event_listeners.js#L84
        if (typeof e.message === 'string' && e.message.startsWith('Missing credentials in config')) {
            const original = e.originalError;
            if (original) {
                // When the SDK does a 'util.copy', they lose the Error-ness of the inner error
                // (they copy the Error's properties into a plain object) so make it an Error object again.
                e = Object.assign(new Error(), original);
            }
        }
        // At this point, the error might still be a generic "ChainableTemporaryCredentials failed"
        // error which wraps the REAL error (AssumeRole failed). We're going to replace the error
        // message with one that's more likely to help users, and tell them the most probable
        // fix (bootstrapping). The underlying service call failure will be appended below.
        if (e.message === 'Could not load credentials from ChainableTemporaryCredentials') {
            e.message = [
                'Could not assume role in target account',
                ...this.sdkOptions.assumeRoleCredentialsSourceDescription
                    ? [`using ${this.sdkOptions.assumeRoleCredentialsSourceDescription}`]
                    : [],
                '(did you bootstrap the environment with the right \'--trust\'s?)',
            ].join(' ');
        }
        // Replace the message on this error with a concatenation of all inner error messages.
        // Must more clear what's going on that way.
        e.message = allChainedExceptionMessages(e);
        return e;
    }
}
exports.SDK = SDK;
SDK.accountCache = new account_cache_1.AccountAccessKeyCache();
const CURRENT_ACCOUNT_KEY = Symbol('current_account_key');
function isFunction(x) {
    return x && {}.toString.call(x) === '[object Function]';
}
/**
 * Return the concatenated message of all exceptions in the AWS exception chain
 */
function allChainedExceptionMessages(e) {
    const ret = new Array();
    while (e) {
        ret.push(e.message);
        e = e.originalError;
    }
    return ret.join(': ');
}
