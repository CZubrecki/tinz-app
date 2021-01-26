export interface Credentials {
    email: string;
    password: string;
}

export interface ResetPassword {
    email: string;
    newPassword?: string;
    verificationCode?: string;
}