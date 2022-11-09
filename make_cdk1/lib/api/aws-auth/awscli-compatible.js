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
exports.AwsCliCompatible = void 0;
const child_process = __importStar(require("child_process"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs-extra"));
const promptly = __importStar(require("promptly"));
const logging_1 = require("../../logging");
const aws_sdk_inifile_1 = require("./aws-sdk-inifile");
const sdk_ini_file_1 = require("./sdk_ini_file");
/**
 * Behaviors to match AWS CLI
 *
 * See these links:
 *
 * https://docs.aws.amazon.com/cli/latest/topic/config-vars.html
 * https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
 */
class AwsCliCompatible {
    /**
     * Build an AWS CLI-compatible credential chain provider
     *
     * This is similar to the default credential provider chain created by the SDK
     * except:
     *
     * 1. Accepts profile argument in the constructor (the SDK must have it prepopulated
     *    in the environment).
     * 2. Conditionally checks EC2 credentials, because checking for EC2
     *    credentials on a non-EC2 machine may lead to long delays (in the best case)
     *    or an exception (in the worst case).
     * 3. Respects $AWS_SHARED_CREDENTIALS_FILE.
     * 4. Respects $AWS_DEFAULT_PROFILE in addition to $AWS_PROFILE.
     */
    static async credentialChain(options = {}) {
        // To match AWS CLI behavior, if a profile is explicitly given using --profile,
        // we use that to the exclusion of everything else (note: this does not apply
        // to AWS_PROFILE, environment credentials still take precedence over AWS_PROFILE)
        if (options.profile) {
            await forceSdkToReadConfigIfPresent();
            const theProfile = options.profile;
            return new AWS.CredentialProviderChain([
                () => profileCredentials(theProfile),
                () => new AWS.ProcessCredentials({ profile: theProfile }),
            ]);
        }
        const implicitProfile = process.env.AWS_PROFILE || process.env.AWS_DEFAULT_PROFILE || 'default';
        const sources = [
            () => new AWS.EnvironmentCredentials('AWS'),
            () => new AWS.EnvironmentCredentials('AMAZON'),
        ];
        if (await fs.pathExists(credentialsFileName())) {
            // Force reading the `config` file if it exists by setting the appropriate
            // environment variable.
            await forceSdkToReadConfigIfPresent();
            sources.push(() => profileCredentials(implicitProfile));
            sources.push(() => new AWS.ProcessCredentials({ profile: implicitProfile }));
        }
        if (options.containerCreds ?? hasEcsCredentials()) {
            sources.push(() => new AWS.ECSCredentials());
        }
        else if (hasWebIdentityCredentials()) {
            // else if: we have found WebIdentityCredentials as provided by EKS ServiceAccounts
            sources.push(() => new AWS.TokenFileWebIdentityCredentials());
        }
        else if (options.ec2instance ?? await isEc2Instance()) {
            // else if: don't get EC2 creds if we should have gotten ECS or EKS creds
            // ECS and EKS instances also run on EC2 boxes but the creds represent something different.
            // Same behavior as upstream code.
            sources.push(() => new AWS.EC2MetadataCredentials());
        }
        return new AWS.CredentialProviderChain(sources);
        function profileCredentials(profileName) {
            return new aws_sdk_inifile_1.PatchedSharedIniFileCredentials({
                profile: profileName,
                filename: credentialsFileName(),
                httpOptions: options.httpOptions,
                tokenCodeFn,
            });
        }
    }
    /**
     * Return the default region in a CLI-compatible way
     *
     * Mostly copied from node_loader.js, but with the following differences to make it
     * AWS CLI compatible:
     *
     * 1. Takes a profile name as an argument (instead of forcing it to be taken from $AWS_PROFILE).
     *    This requires having made a copy of the SDK's `SharedIniFile` (the original
     *    does not take an argument).
     * 2. $AWS_DEFAULT_PROFILE and $AWS_DEFAULT_REGION are also respected.
     *
     * Lambda and CodeBuild set the $AWS_REGION variable.
     */
    static async region(options = {}) {
        const profile = options.profile || process.env.AWS_PROFILE || process.env.AWS_DEFAULT_PROFILE || 'default';
        // Defaults inside constructor
        const toCheck = [
            { filename: credentialsFileName(), profile },
            { isConfig: true, filename: configFileName(), profile },
            { isConfig: true, filename: configFileName(), profile: 'default' },
        ];
        let region = process.env.AWS_REGION || process.env.AMAZON_REGION ||
            process.env.AWS_DEFAULT_REGION || process.env.AMAZON_DEFAULT_REGION;
        while (!region && toCheck.length > 0) {
            const opts = toCheck.shift();
            if (await fs.pathExists(opts.filename)) {
                const configFile = new sdk_ini_file_1.SharedIniFile(opts);
                const section = await configFile.getProfile(opts.profile);
                region = section?.region;
            }
        }
        if (!region && (options.ec2instance ?? await isEc2Instance())) {
            (0, logging_1.debug)('Looking up AWS region in the EC2 Instance Metadata Service (IMDS).');
            const imdsOptions = {
                httpOptions: { timeout: 1000, connectTimeout: 1000 }, maxRetries: 2,
            };
            const metadataService = new AWS.MetadataService(imdsOptions);
            let token;
            try {
                token = await getImdsV2Token(metadataService);
            }
            catch (e) {
                (0, logging_1.debug)(`No IMDSv2 token: ${e}`);
            }
            try {
                region = await getRegionFromImds(metadataService, token);
                (0, logging_1.debug)(`AWS region from IMDS: ${region}`);
            }
            catch (e) {
                (0, logging_1.debug)(`Unable to retrieve AWS region from IMDS: ${e}`);
            }
        }
        if (!region) {
            const usedProfile = !profile ? '' : ` (profile: "${profile}")`;
            region = 'us-east-1'; // This is what the AWS CLI does
            (0, logging_1.debug)(`Unable to determine AWS region from environment or AWS configuration${usedProfile}, defaulting to '${region}'`);
        }
        return region;
    }
}
exports.AwsCliCompatible = AwsCliCompatible;
/**
 * Return whether it looks like we'll have ECS credentials available
 */
function hasEcsCredentials() {
    return AWS.ECSCredentials.prototype.isConfiguredForEcsCredentials();
}
/**
 * Return whether it looks like we'll have WebIdentityCredentials (that's what EKS uses) available
 * No check like hasEcsCredentials available, so have to implement our own.
 * @see https://github.com/aws/aws-sdk-js/blob/3ccfd94da07234ae87037f55c138392f38b6881d/lib/credentials/token_file_web_identity_credentials.js#L59
 */
function hasWebIdentityCredentials() {
    return Boolean(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE);
}
/**
 * Return whether we're on an EC2 instance
 */
async function isEc2Instance() {
    if (isEc2InstanceCache === undefined) {
        (0, logging_1.debug)("Determining if we're on an EC2 instance.");
        let instance = false;
        if (process.platform === 'win32') {
            // https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/identify_ec2_instances.html
            try {
                const result = await util.promisify(child_process.exec)('wmic path win32_computersystemproduct get uuid', { encoding: 'utf-8' });
                // output looks like
                //  UUID
                //  EC2AE145-D1DC-13B2-94ED-01234ABCDEF
                const lines = result.stdout.toString().split('\n');
                instance = lines.some(x => matchesRegex(/^ec2/i, x));
            }
            catch (e) {
                // Modern machines may not have wmic.exe installed. No reason to fail, just assume it's not an EC2 instance.
                (0, logging_1.debug)(`Checking using WMIC failed, assuming NOT an EC2 instance: ${e.message} (pass --ec2creds to force)`);
                instance = false;
            }
        }
        else {
            // https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/identify_ec2_instances.html
            const files = [
                // This recognizes the Xen hypervisor based instances (pre-5th gen)
                ['/sys/hypervisor/uuid', /^ec2/i],
                // This recognizes the new Hypervisor (5th-gen instances and higher)
                // Can't use the advertised file '/sys/devices/virtual/dmi/id/product_uuid' because it requires root to read.
                // Instead, sys_vendor contains something like 'Amazon EC2'.
                ['/sys/devices/virtual/dmi/id/sys_vendor', /ec2/i],
            ];
            for (const [file, re] of files) {
                if (matchesRegex(re, readIfPossible(file))) {
                    instance = true;
                    break;
                }
            }
        }
        (0, logging_1.debug)(instance ? 'Looks like an EC2 instance.' : 'Does not look like an EC2 instance.');
        isEc2InstanceCache = instance;
    }
    return isEc2InstanceCache;
}
let isEc2InstanceCache = undefined;
/**
 * Attempts to get a Instance Metadata Service V2 token
 */
async function getImdsV2Token(metadataService) {
    (0, logging_1.debug)('Attempting to retrieve an IMDSv2 token.');
    return new Promise((resolve, reject) => {
        metadataService.request('/latest/api/token', {
            method: 'PUT',
            headers: { 'x-aws-ec2-metadata-token-ttl-seconds': '60' },
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            else if (!token) {
                reject(new Error('IMDS did not return a token.'));
            }
            else {
                resolve(token);
            }
        });
    });
}
/**
 * Attempts to get the region from the Instance Metadata Service
 */
async function getRegionFromImds(metadataService, token) {
    (0, logging_1.debug)('Retrieving the AWS region from the IMDS.');
    let options = {};
    if (token) {
        options = { headers: { 'x-aws-ec2-metadata-token': token } };
    }
    return new Promise((resolve, reject) => {
        metadataService.request('/latest/dynamic/instance-identity/document', options, (err, instanceIdentityDocument) => {
            if (err) {
                reject(err);
            }
            else if (!instanceIdentityDocument) {
                reject(new Error('IMDS did not return an Instance Identity Document.'));
            }
            else {
                try {
                    resolve(JSON.parse(instanceIdentityDocument).region);
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    });
}
function homeDir() {
    return process.env.HOME || process.env.USERPROFILE
        || (process.env.HOMEPATH ? ((process.env.HOMEDRIVE || 'C:/') + process.env.HOMEPATH) : null) || os.homedir();
}
function credentialsFileName() {
    return process.env.AWS_SHARED_CREDENTIALS_FILE || path.join(homeDir(), '.aws', 'credentials');
}
function configFileName() {
    return process.env.AWS_CONFIG_FILE || path.join(homeDir(), '.aws', 'config');
}
/**
 * Force the JS SDK to honor the ~/.aws/config file (and various settings therein)
 *
 * For example, there is just *NO* way to do AssumeRole credentials as long as AWS_SDK_LOAD_CONFIG is not set,
 * or read credentials from that file.
 *
 * The SDK crashes if the variable is set but the file does not exist, so conditionally set it.
 */
async function forceSdkToReadConfigIfPresent() {
    if (await fs.pathExists(configFileName())) {
        process.env.AWS_SDK_LOAD_CONFIG = '1';
    }
}
function matchesRegex(re, s) {
    return s !== undefined && re.exec(s) !== null;
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
 * Ask user for MFA token for given serial
 *
 * Result is send to callback function for SDK to authorize the request
 */
async function tokenCodeFn(serialArn, cb) {
    (0, logging_1.debug)('Require MFA token for serial ARN', serialArn);
    try {
        const token = await promptly.prompt(`MFA token for ${serialArn}: `, {
            trim: true,
            default: '',
        });
        (0, logging_1.debug)('Successfully got MFA token from user');
        cb(undefined, token);
    }
    catch (err) {
        (0, logging_1.debug)('Failed to get MFA token', err);
        cb(err);
    }
}
