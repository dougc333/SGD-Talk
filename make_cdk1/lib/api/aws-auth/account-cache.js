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
exports.AccountAccessKeyCache = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const logging_1 = require("../../logging");
const directories_1 = require("../../util/directories");
/**
 * Disk cache which maps access key IDs to account IDs.
 * Usage:
 *   cache.get(accessKey) => accountId | undefined
 *   cache.put(accessKey, accountId)
 */
class AccountAccessKeyCache {
    /**
     * @param filePath Path to the cache file
     */
    constructor(filePath) {
        this.cacheFile = filePath || path.join((0, directories_1.cdkCacheDir)(), 'accounts_partitions.json');
    }
    /**
     * Tries to fetch the account ID from cache. If it's not in the cache, invokes
     * the resolver function which should retrieve the account ID and return it.
     * Then, it will be stored into disk cache returned.
     *
     * Example:
     *
     *    const accountId = cache.fetch(accessKey, async () => {
     *      return await fetchAccountIdFromSomewhere(accessKey);
     *    });
     *
     * @param accessKeyId
     * @param resolver
     */
    async fetch(accessKeyId, resolver) {
        // try to get account ID based on this access key ID from disk.
        const cached = await this.get(accessKeyId);
        if (cached) {
            (0, logging_1.debug)(`Retrieved account ID ${cached.accountId} from disk cache`);
            return cached;
        }
        // if it's not in the cache, resolve and put in cache.
        const account = await resolver();
        if (account) {
            await this.put(accessKeyId, account);
        }
        return account;
    }
    /** Get the account ID from an access key or undefined if not in cache */
    async get(accessKeyId) {
        const map = await this.loadMap();
        return map[accessKeyId];
    }
    /** Put a mapping betweenn access key and account ID */
    async put(accessKeyId, account) {
        let map = await this.loadMap();
        // nuke cache if it's too big.
        if (Object.keys(map).length >= AccountAccessKeyCache.MAX_ENTRIES) {
            map = {};
        }
        map[accessKeyId] = account;
        await this.saveMap(map);
    }
    async loadMap() {
        try {
            return await fs.readJson(this.cacheFile);
        }
        catch (e) {
            // File doesn't exist or is not readable. This is a cache,
            // pretend we successfully loaded an empty map.
            if (e.code === 'ENOENT' || e.code === 'EACCES') {
                return {};
            }
            // File is not JSON, could be corrupted because of concurrent writes.
            // Again, an empty cache is fine.
            if (e instanceof SyntaxError) {
                return {};
            }
            throw e;
        }
    }
    async saveMap(map) {
        try {
            await fs.ensureFile(this.cacheFile);
            await fs.writeJson(this.cacheFile, map, { spaces: 2 });
        }
        catch (e) {
            // File doesn't exist or file/dir isn't writable. This is a cache,
            // if we can't write it then too bad.
            if (e.code === 'ENOENT' || e.code === 'EACCES' || e.code === 'EROFS') {
                return;
            }
            throw e;
        }
    }
}
exports.AccountAccessKeyCache = AccountAccessKeyCache;
/**
 * Max number of entries in the cache, after which the cache will be reset.
 */
AccountAccessKeyCache.MAX_ENTRIES = 1000;
