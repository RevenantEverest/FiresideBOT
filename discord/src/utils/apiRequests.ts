import axios from 'axios';

import { CommandDispatch } from '../types/commands.js';
import { HandleAxiosReturn } from '../types/promises.js';
import { 
    AxiosApiResponse, 
    AxiosPaginatedApiResponse, 
    ApiPaginatedResponse
} from '../types/api.js';

import { issueToken } from '../middleware/index.js';
import * as promises from './promises.js';

type ApiResponse<T> = AxiosApiResponse<T>;
type PaginatedApiResponse<T> = AxiosPaginatedApiResponse<T>;

type RequestMethods = "get" | "post" | "put" | "patch" | "delete";

interface CommonRequestParams {
    dispatch: CommandDispatch,
    method: RequestMethods,
    endpoint: string,
};

interface RequestParams<T> extends CommonRequestParams {
    data?: T
};

export async function request<T, D = void>({ dispatch, method, endpoint, data }: RequestParams<D>): HandleAxiosReturn<T> {
    const request = generateRequest(dispatch, method, endpoint, data);

    const [res, err] = await promises.handleApi<ApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};

export async function paginatedRequest<T>({ dispatch, method, endpoint }: CommonRequestParams): HandleAxiosReturn<ApiPaginatedResponse<T>> {
    const request = generateRequest(dispatch, method, endpoint);

    const [res, err] = await promises.handleApi<AxiosPaginatedApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};

export async function generateRequest<T>(dispatch: CommandDispatch, method: RequestMethods, endpoint: string, data?: T) {
    const token = await issueToken(dispatch);
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const request = axios({ url: endpoint, method, data, headers });

    return request;
};