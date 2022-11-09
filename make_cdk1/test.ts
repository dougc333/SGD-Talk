import * as yargs from 'yargs'
import {SdkProvider} from './lib/api/aws-auth'



interface SdkProviderOptions {
  /**
   * Profile to read from ~/.aws
   *
   * @default - No profile
   */
  readonly profile?: string;

  /**
   * Whether we should check for EC2 credentials
   *
   * @default - Autodetect
   */
  readonly ec2creds?: boolean;

  /**
   * Whether we should check for container credentials
   *
   * @default - Autodetect
   */
  readonly containerCreds?: boolean;

  /**
   * HTTP options for SDK
   */
  readonly httpOptions?: SdkHttpOptions;
}


interface SdkHttpOptions {
  /**
   * Proxy address to use
   *
   * @default No proxy
   */
  readonly proxyAddress?: string;

  /**
   * A path to a certificate bundle that contains a cert to be trusted.
   *
   * @default No certificate bundle
   */
  readonly caBundlePath?: string;

  /**
   * The custom user agent to use.
   *
   * @default - <package-name>/<package-version>
   */
  readonly userAgent?: string;
}



export class AwsCliCompatible {
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
  public static async credentialChain(options: CredentialChainOptions = {}) {

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
    } else if (hasWebIdentityCredentials()) {
      // else if: we have found WebIdentityCredentials as provided by EKS ServiceAccounts
      sources.push(() => new AWS.TokenFileWebIdentityCredentials());
    } else if (options.ec2instance ?? await isEc2Instance()) {
      // else if: don't get EC2 creds if we should have gotten ECS or EKS creds
      // ECS and EKS instances also run on EC2 boxes but the creds represent something different.
      // Same behavior as upstream code.
      sources.push(() => new AWS.EC2MetadataCredentials());
    }

    return new AWS.CredentialProviderChain(sources);

    function profileCredentials(profileName: string) {
      return new PatchedSharedIniFileCredentials({
        profile: profileName,
        filename: credentialsFileName(),
        httpOptions: options.httpOptions,
        tokenCodeFn,
      });
    }
  }

 ` /**
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
  public static async region(options: RegionOptions = {}): Promise<string> {
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
      const opts = toCheck.shift()!;
      if (await fs.pathExists(opts.filename)) {
        const configFile = new SharedIniFile(opts);
        const section = await configFile.getProfile(opts.profile);
        region = section?.region;
      }
    }

    if (!region && (options.ec2instance ?? await isEc2Instance())) {
      debug('Looking up AWS region in the EC2 Instance Metadata Service (IMDS).');
      const imdsOptions = {
        httpOptions: { timeout: 1000, connectTimeout: 1000 }, maxRetries: 2,
      };
      const metadataService = new AWS.MetadataService(imdsOptions);

      let token;
      try {
        token = await getImdsV2Token(metadataService);
      } catch (e) {
        debug(`No IMDSv2 token: ${e}`);
      }

      try {
        region = await getRegionFromImds(metadataService, token);
        debug(`AWS region from IMDS: ${region}`);
      } catch (e) {
        debug(`Unable to retrieve AWS region from IMDS: ${e}`);
      }
    }

    if (!region) {
      const usedProfile = !profile ? '' : ` (profile: "${profile}")`;
      region = 'us-east-1'; // This is what the AWS CLI does
      debug(`Unable to determine AWS region from environment or AWS configuration${usedProfile}, defaulting to '${region}'`);
    }

    return region;
  }
}



class SdkProvider {
  /**
   * Create a new SdkProvider which gets its defaults in a way that behaves like the AWS CLI does
   *
   * The AWS SDK for JS behaves slightly differently from the AWS CLI in a number of ways; see the
   * class `AwsCliCompatible` for the details.
   */
  public static async withAwsCliCompatibleDefaults(options: SdkProviderOptions = {}) {
    const sdkOptions = parseHttpOptions(options.httpOptions ?? {});

    const chain = await AwsCliCompatible.credentialChain({
      profile: options.profile,
      ec2instance: options.ec2creds,
      containerCreds: options.containerCreds,
      httpOptions: sdkOptions.httpOptions,
    });
    const region = await AwsCliCompatible.region({
      profile: options.profile,
      ec2instance: options.ec2creds,
    });

    return new SdkProvider(chain, region, sdkOptions);
  }



function parseCommandLineArguments(){
  //constinitTemplateLanguages = await availableInitLanguages();
  return yargs
    .env("CDK")
}

let a = parseCommandLineArguments()
console.log(typeof(a));
console.log(JSON.stringify(a))


 const configuration = new Configuration({
    commandLineArguments: {
      ...argv,
      _: argv._ as [Command, ...string[]], // TypeScript at its best
    },
  });
  await configuration.load();

  const sdkProvider = await SdkProvider.withAwsCliCompatibleDefaults({
    profile: configuration.settings.get(['profile']),
    ec2creds: argv.ec2creds,
    httpOptions: {
      proxyAddress: argv.proxy,
      caBundlePath: argv['ca-bundle-path'],
    },
  });
