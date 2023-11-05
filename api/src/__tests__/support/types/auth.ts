import { AuthPayload } from '../../../types/auth.js';

export interface AuthHeader {
    Authorization: string
};

export interface AuthTestingPayload extends AuthPayload {
    header: AuthHeader
};