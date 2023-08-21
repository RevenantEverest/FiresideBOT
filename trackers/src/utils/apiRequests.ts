import axios from 'axios';

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
    method: RequestMethods,
    endpoint: string,
};

interface RequestParams<T> extends CommonRequestParams {
    data?: T
};

export async function request<T, D = void>({ method, endpoint, data }: RequestParams<D>): HandleAxiosReturn<T> {
    const request = generateRequest(method, endpoint, data);

    const [res, err] = await promises.handleApi<ApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};

export async function paginatedRequest<T>({ method, endpoint }: CommonRequestParams): HandleAxiosReturn<ApiPaginatedResponse<T>> {
    const request = generateRequest(method, endpoint);

    const [res, err] = await promises.handleApi<AxiosPaginatedApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};

export async function generateRequest<T>( method: RequestMethods, endpoint: string, data?: T) {
    const token = await issueToken();
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const request = axios({ url: endpoint, method, data, headers });

    return request;
};