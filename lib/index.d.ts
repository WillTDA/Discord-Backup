import type { BackupData, BackupInfos, CreateOptions, LoadOptions } from './types/';
import type { Guild } from 'discord.js';
/**
 * Fetches a Backup and Returns its Data.
 * @param {String} backupID The ID of the Backup.
 */
export declare const fetch: (backupID: string) => Promise<BackupInfos>;
/**
 * Creates a New Backup and Saves it to the Database.
 * @param {Guild} guild The Discord Guild you want to Backup.
 * @param {CreateOptions} options The Backup Creation Options you Want to Use.
 */
export declare const create: (guild: Guild, options?: CreateOptions) => Promise<BackupData>;
/**
 * Loads a Backup for a Guild.
 * @param {String|BackupData} backup The ID of the Backup or any Valid "BackupData".
 * @param {CreateOptions} options The Backup Creation Options you Want to Use.
 */
export declare const load: (backup: string | BackupData, guild: Guild, options?: LoadOptions) => Promise<unknown>;
/**
 * Removes/Deletes a Backup. This Action is Irreversible!
 * @param {String} backupID The ID of the Backup.
 */
export declare const remove: (backupID: string) => Promise<void>;
/**
 * Returns an Object of All Backups in the Database.
 */
export declare const list: () => Promise<Object[]>;
/**
 * Returns an Object of a Guild's Backups.
 * @param {Guild} guild The Discord Guild you want to list backups for.
 */
 export declare const listGuildBackups: (guild: Guild) => Promise<Object[]>;
/**
 * Set the MongoDB Database URI and Connect using it.
 * @param {String} uri The MongoDB Database URI.
 */
export declare const connectToDatabase: (uri: string) => void;
declare const _default: {
    create: (guild: Guild, options?: CreateOptions) => Promise<BackupData>;
    fetch: (backupID: string) => Promise<BackupInfos>;
    list: () => Promise<Object[]>;
    listGuildBackups: (guild: Guild) => Promise<Object[]>;
    load: (backup: string | BackupData, guild: Guild, options?: LoadOptions) => Promise<unknown>;
    remove: (backupID: string) => Promise<void>;
};
export default _default;
