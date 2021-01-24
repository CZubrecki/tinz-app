import { Credentials, ResetPassword } from '../models/Auth.model';
import { api, POST } from './API';

export async function signIn(credentials: Credentials): Promise<any> {
    console.log(credentials);
    return await api(`/auth/login`, POST, credentials);
}

export async function signUp(credentials: Credentials): Promise<any> {
    return await api(`/auth/register`, POST, credentials);
}

export async function resetPassword(resetPassword: ResetPassword): Promise<any> {
    return await api(`/auth/reset-password`, POST, resetPassword);
}