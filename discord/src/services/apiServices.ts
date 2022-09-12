import axios, { AxiosResponse } from 'axios';
import { URLS } from '../constants/index.js';

export async function getDadJoke(): Promise<AxiosResponse> {
    return axios.get(`${URLS.API.ICANHAZDADJOKE}`, {
        headers: {
            Accept: "application/json",
            'User-Agent': "FiresideBOT (https://github.com/RevenantEverest/FiresideBOT)"
        }
    });
};