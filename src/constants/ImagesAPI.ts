import { Platform } from "react-native";
import { api, POST } from "./API";

const MULTI_PART = 'multipart/form-data';

export async function processImage(image: any): Promise<any> {
    const photo = {
        uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
        type: 'image/jpeg',
        name: 'scan.jpg',
    };
    const data = new FormData();
    data.append("image", photo);
    await api(`/images/process`, POST, data, MULTI_PART);
}