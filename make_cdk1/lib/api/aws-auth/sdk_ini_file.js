"use strict";
/**
 * A reimplementation of JS AWS SDK's SharedIniFile class
 *
 * We need that class to parse the ~/.aws/config file to determine the correct
 * region at runtime, but unfortunately it is private upstream.
 */
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
exports.SharedIniFile = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs-extra"));
class SharedIniFile {
    constructor(options) {
        options = options || {};
        this.isConfig = options.isConfig === true;
        this.filename = options.filename || this.getDefaultFilepath();
    }
    async getProfile(profile) {
        await this.ensureFileLoaded();
        const profileIndex = profile !== AWS.util.defaultProfile && this.isConfig ?
            'profile ' + profile : profile;
        return this.parsedContents[profileIndex];
    }
    getDefaultFilepath() {
        return path.join(os.homedir(), '.aws', this.isConfig ? 'config' : 'credentials');
    }
    async ensureFileLoaded() {
        if (this.parsedContents) {
            return;
        }
        if (!await fs.pathExists(this.filename)) {
            this.parsedContents = {};
            return;
        }
        const contents = (await fs.readFile(this.filename)).toString();
        this.parsedContents = AWS.util.ini.parse(contents);
    }
}
exports.SharedIniFile = SharedIniFile;
