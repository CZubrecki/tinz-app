import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PUT = 'PUT';

export const api = async (
    endpoint: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' = 'GET',
    body?: any,
    contentType?: any,
    options: { extraHeaders?: { [key: string]: string }; params?: object } = {},
) => {
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = body ? contentType ? body : JSON.stringify(body) : undefined;
    const response = await fetch(API_URL + endpoint, {
        method,
        headers: {
            'Content-Type': contentType ? contentType : 'application/json',
            ...(!!token ? { 'Authorization': 'Bearer ' + token } : undefined),
            ...options.extraHeaders,
        },
        body: requestBody,
    });

    const data = await response
        .json()
        .catch((err) => console.log(`Not able to read response body, it's possible there wasn't one. ${JSON.stringify(err)}`));

    return data;
}