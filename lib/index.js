"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.list = exports.remove = exports.load = exports.create = exports.fetch = void 0;
var discord_js_1 = require("discord.js");
var node_fetch_1 = require("node-fetch");
var createMaster = require("./create");
var loadMaster = require("./load");
var utilMaster = require("./util");
var { Database } = require("quickmongo");
var filesize = require("filesize");
var db;
/**
 * Checks if a backup exists and returns its data
 */
var getBackupData = function (backupID) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var entries, entry, backupData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.all()];
                            case 1:
                                entries = _a.sent();
                                entry = entries.filter(function (entry) { return entry.ID === `backup_${backupID}` })
                                if (entry !== null) {
                                    backupData = entry[0].data
                                    console.log(backupData)
                                    // Returns backup informations
                                    resolve(backupData);
                                }
                                else {
                                    // If no backup was found, return an error message
                                    reject('No backup found');
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            })];
        });
    });
};
/**
 * Fetches a Backup and Returns its Data.
 */
var fetch = function (backupID) {
    return new Promise(function (resolve, reject) {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                getBackupData(backupID)
                    .then(function (backupData) {
                        var size = Buffer.byteLength(JSON.stringify(backupData)); // Gets the size of the file
                        var backupInfos = {
                            data: backupData,
                            id: backupID,
                            size: filesize(size, { round: 0 })
                        };
                        // Returns backup informations
                        resolve(backupInfos);
                    })
                    .catch(function (e) {
                        reject('No backup found');
                        console.log(e)
                    });
                return [2 /*return*/];
            });
        });
    });
};
exports.fetch = fetch;
/**
 * Creates a New Backup and Saves it to the Database.
 */
var create = function (guild, options) {
    if (options === void 0) {
        options = {
            backupID: null,
            maxMessagesPerChannel: 10,
            jsonSave: true,
            jsonBeautify: true,
            doNotBackup: [],
            saveImages: ''
        };
    }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var backupData, _a, _b, _c, _d, _e, _f, _g, backupJSON, e_1;
                    var _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                _j.trys.push([0, 20, , 21]);
                                backupData = {
                                    name: guild.name,
                                    region: guild.region,
                                    verificationLevel: guild.verificationLevel,
                                    explicitContentFilter: guild.explicitContentFilter,
                                    defaultMessageNotifications: guild.defaultMessageNotifications,
                                    afk: guild.afkChannel ? { name: guild.afkChannel.name, timeout: guild.afkTimeout } : null,
                                    widget: {
                                        enabled: guild.widgetEnabled,
                                        channel: guild.widgetChannel ? guild.widgetChannel.name : null
                                    },
                                    channels: { categories: [], others: [] },
                                    roles: [],
                                    bans: [],
                                    emojis: [],
                                    createdTimestamp: Date.now(),
                                    guildID: guild.id,
                                    id: (_h = options.backupID) !== null && _h !== void 0 ? _h : discord_js_1.SnowflakeUtil.generate(Date.now())
                                };
                                if (!guild.iconURL()) return [3 /*break*/, 3];
                                if (!(options && options.saveImages && options.saveImages === 'base64')) return [3 /*break*/, 2];
                                _a = backupData;
                                return [4 /*yield*/, node_fetch_1.default(guild.iconURL({ dynamic: true })).then(function (res) { return res.buffer(); })];
                            case 1:
                                _a.iconBase64 = (_j.sent()).toString('base64');
                                _j.label = 2;
                            case 2:
                                backupData.iconURL = guild.iconURL({ dynamic: true });
                                _j.label = 3;
                            case 3:
                                if (!guild.splashURL()) return [3 /*break*/, 6];
                                if (!(options && options.saveImages && options.saveImages === 'base64')) return [3 /*break*/, 5];
                                _b = backupData;
                                return [4 /*yield*/, node_fetch_1.default(guild.splashURL()).then(function (res) { return res.buffer(); })];
                            case 4:
                                _b.splashBase64 = (_j.sent()).toString('base64');
                                _j.label = 5;
                            case 5:
                                backupData.splashURL = guild.splashURL();
                                _j.label = 6;
                            case 6:
                                if (!guild.bannerURL()) return [3 /*break*/, 9];
                                if (!(options && options.saveImages && options.saveImages === 'base64')) return [3 /*break*/, 8];
                                _c = backupData;
                                return [4 /*yield*/, node_fetch_1.default(guild.bannerURL()).then(function (res) { return res.buffer(); })];
                            case 7:
                                _c.bannerBase64 = (_j.sent()).toString('base64');
                                _j.label = 8;
                            case 8:
                                backupData.bannerURL = guild.bannerURL();
                                _j.label = 9;
                            case 9:
                                if (!(!options || !(options.doNotBackup || []).includes('bans'))) return [3 /*break*/, 11];
                                // Backup bans
                                _d = backupData;
                                return [4 /*yield*/, createMaster.getBans(guild)];
                            case 10:
                                // Backup bans
                                _d.bans = _j.sent();
                                _j.label = 11;
                            case 11:
                                if (!(!options || !(options.doNotBackup || []).includes('roles'))) return [3 /*break*/, 13];
                                // Backup roles
                                _e = backupData;
                                return [4 /*yield*/, createMaster.getRoles(guild)];
                            case 12:
                                // Backup roles
                                _e.roles = _j.sent();
                                _j.label = 13;
                            case 13:
                                if (!(!options || !(options.doNotBackup || []).includes('emojis'))) return [3 /*break*/, 15];
                                // Backup emojis
                                _f = backupData;
                                return [4 /*yield*/, createMaster.getEmojis(guild, options)];
                            case 14:
                                // Backup emojis
                                _f.emojis = _j.sent();
                                _j.label = 15;
                            case 15:
                                if (!(!options || !(options.doNotBackup || []).includes('channels'))) return [3 /*break*/, 17];
                                // Backup channels
                                _g = backupData;
                                return [4 /*yield*/, createMaster.getChannels(guild, options)];
                            case 16:
                                // Backup channels
                                _g.channels = _j.sent();
                                _j.label = 17;
                            case 17:
                                if (!(!options || options.jsonSave === undefined || options.jsonSave)) return [3 /*break*/, 19];
                                backupJSON = options.jsonBeautify
                                    ? JSON.stringify(backupData, null, 4)
                                    : JSON.stringify(backupData);
                                // Save the backup
                                return [4 /*yield*/, db.set(`backup_${backupData.id}`, JSON.parse(backupJSON))];
                            case 18:
                                // Save the backup
                                _j.sent();
                                _j.label = 19;
                            case 19:
                                // Returns ID
                                resolve(backupData);
                                return [3 /*break*/, 21];
                            case 20:
                                e_1 = _j.sent();
                                return [2 /*return*/, reject(e_1)];
                            case 21: return [2 /*return*/];
                        }
                    });
                });
            })];
        });
    });
};
exports.create = create;
/**
 * Loads a Backup for a Guild.
 */
var load = function (backup, guild, options) {
    if (options === void 0) {
        options = {
            clearGuildBeforeRestore: true,
            maxMessagesPerChannel: 10
        };
    }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var backupData, _a, e_2, e_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!guild) {
                                    return [2 /*return*/, reject('Invalid guild')];
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 11, , 12]);
                                if (!(typeof backup === 'string')) return [3 /*break*/, 3];
                                return [4 /*yield*/, getBackupData(backup)];
                            case 2:
                                _a = _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = backup;
                                _b.label = 4;
                            case 4:
                                backupData = _a;
                                _b.label = 5;
                            case 5:
                                _b.trys.push([5, 9, , 10]);
                                if (!(options.clearGuildBeforeRestore === undefined || options.clearGuildBeforeRestore)) return [3 /*break*/, 7];
                                // Clear the guild
                                return [4 /*yield*/, utilMaster.clearGuild(guild)];
                            case 6:
                                // Clear the guild
                                _b.sent();
                                _b.label = 7;
                            case 7: return [4 /*yield*/, Promise.all([
                                // Restore guild configuration
                                loadMaster.loadConfig(guild, backupData),
                                // Restore guild roles
                                loadMaster.loadRoles(guild, backupData),
                                // Restore guild channels
                                loadMaster.loadChannels(guild, backupData, options),
                                // Restore afk channel and timeout
                                loadMaster.loadAFK(guild, backupData),
                                // Restore guild emojis
                                loadMaster.loadEmojis(guild, backupData),
                                // Restore guild bans
                                loadMaster.loadBans(guild, backupData),
                                // Restore embed channel
                                loadMaster.loadEmbedChannel(guild, backupData)
                            ])];
                            case 8:
                                _b.sent();
                                return [3 /*break*/, 10];
                            case 9:
                                e_2 = _b.sent();
                                return [2 /*return*/, reject(e_2)];
                            case 10:
                                // Then return the backup data
                                return [2 /*return*/, resolve(backupData)];
                            case 11:
                                e_3 = _b.sent();
                                return [2 /*return*/, reject('No backup found')];
                            case 12: return [2 /*return*/];
                        }
                    });
                });
            })];
        });
    });
};
exports.load = load;
/**
 * Removes/Deletes a Backup. This Action is Irreversible!
 */
var remove = function (backupID) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                try {
                    db.delete(`backup_${backupID}`)
                    resolve();
                }
                catch (error) {
                    reject('Backup not found');
                }
            })];
        });
    });
};
exports.remove = remove;
/**
 * Returns an Object of All Backups in the Database.
 */
var list = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.startsWith(`backup_`, { sort: `.data` })];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files];
            }
        });
    });
};
exports.list = list;
/**
 * Returns an Object of a Guild's Backups.
 */
var listGuildBackups = function (guild) {
    return __awaiter(void 0, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.startsWith(`backup_`, { sort: `.data` })];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files.filter(entry => entry.data.guildID == guild.id)];
            }
        });
    });
};
exports.listGuildBackups = listGuildBackups;
/**
 * Set the MongoDB Database URI and Connect using it.
 */
var connectToDatabase = function (uri) {
    db = new Database(uri)
};
exports.connectToDatabase = connectToDatabase;
exports.default = {
    create: exports.create,
    fetch: exports.fetch,
    list: exports.list,
    listGuildBackups: exports.listGuildBackups,
    load: exports.load,
    remove: exports.remove
};