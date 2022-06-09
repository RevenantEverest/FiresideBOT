import fs from 'fs';

export async function getDirectoryNameList(path: string): Promise<string[]> {
    const dirSync = fs.readdirSync(path, { withFileTypes: true });
    const dirSyncDirectories = dirSync.filter((item) => item.isDirectory());
    const directoryNames = dirSyncDirectories.map((item) => item.name);

    return directoryNames;
};

export async function getDirectoryFileNamesList(path: string): Promise<string[]> {
    const dirSync = fs.readdirSync(path);
    const dirSyncFiles = dirSync.filter((file) => file.split(".").pop() === "js");

    return dirSyncFiles;
};