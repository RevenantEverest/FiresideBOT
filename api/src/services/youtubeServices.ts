import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
import { URLS, ENV } from '../constants/index.js';

export async function search(query: string): Promise<AxiosResponse> {

    const data = new URLSearchParams([
        ["part", "snippet"],
        ["maxResults", "1"],
        ["order", "relevance"],
        ["q", query],
        ["type", "video"],
        ["key", ENV.GOOGLE_KEY]
    ]);

    return axios.get(`${URLS.YOUTUBE}/search?` + data.toString());
};