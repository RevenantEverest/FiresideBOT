const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gi;

export async function isValidLink(str: string): Promise<boolean> {
    const re = new RegExp(youtubeRegex);
    return re.test(str);
};

export async function extractVideoId(str: string): Promise<string | null> {
    const re = new RegExp(youtubeRegex);
    const exec = re.exec(str);

    if(!exec) {
        return null;
    }

    return exec[1];
};