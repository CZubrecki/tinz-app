import { API_URL } from "../config";

export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PUT = 'PUT';

export const api = async (
    endpoint: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' = 'GET',
    body?: any,
    options: { extraHeaders?: { [key: string]: string }; params?: object } = {},
) => {
    const response = await fetch(API_URL + endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
            // ...(tokenValid ? { Authorization: auth.tokenType + ' ' + auth.accessToken } : undefined),
            ...options.extraHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response
        .json()
        .catch((err) => console.log(`Not able to read response body, it's possible there wasn't one. ${JSON.stringify(err)}`));

    return data;
}