export interface LoginCredentials {
    login: string;
    password: string;
}

export interface AuthUser {
    id: number;
    name: string;
    group: string;
    school: string;
    direction: string;
    course: number;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}