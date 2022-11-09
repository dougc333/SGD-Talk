"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialPlugins = void 0;
const logging_1 = require("../../logging");
const plugin_1 = require("../../plugin");
/**
 * Cache for credential providers.
 *
 * Given an account and an operating mode (read or write) will return an
 * appropriate credential provider for credentials for the given account. The
 * credential provider will be cached so that multiple AWS clients for the same
 * environment will not make multiple network calls to obtain credentials.
 *
 * Will use default credentials if they are for the right account; otherwise,
 * all loaded credential provider plugins will be tried to obtain credentials
 * for the given account.
 */
class CredentialPlugins {
    constructor() {
        this.cache = {};
    }
    async fetchCredentialsFor(awsAccountId, mode) {
        const key = `${awsAccountId}-${mode}`;
        if (!(key in this.cache)) {
            this.cache[key] = await this.lookupCredentials(awsAccountId, mode);
        }
        return this.cache[key];
    }
    get availablePluginNames() {
        return plugin_1.PluginHost.instance.credentialProviderSources.map(s => s.name);
    }
    async lookupCredentials(awsAccountId, mode) {
        const triedSources = [];
        // Otherwise, inspect the various credential sources we have
        for (const source of plugin_1.PluginHost.instance.credentialProviderSources) {
            if (!(await source.isAvailable())) {
                (0, logging_1.debug)('Credentials source %s is not available, ignoring it.', source.name);
                continue;
            }
            triedSources.push(source);
            if (!(await source.canProvideCredentials(awsAccountId))) {
                continue;
            }
            (0, logging_1.debug)(`Using ${source.name} credentials for account ${awsAccountId}`);
            const providerOrCreds = await source.getProvider(awsAccountId, mode);
            // Backwards compatibility: if the plugin returns a ProviderChain, resolve that chain.
            // Otherwise it must have returned credentials.
            const credentials = providerOrCreds.resolvePromise ? await providerOrCreds.resolvePromise() : providerOrCreds;
            return { credentials, pluginName: source.name };
        }
        return undefined;
    }
}
exports.CredentialPlugins = CredentialPlugins;
