export interface SignupCredential {
    password: string;
    fullName: string;
    email: string;
    username: string;
}

export interface SigninCredential {
    password: string;
    username: string;
}

export interface AuthResponse {
    id: string;
    accessToken: string;
    username: string;
}