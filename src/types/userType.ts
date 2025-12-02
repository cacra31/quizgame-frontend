export interface UserDto {
    userId: string;
    name: string;
}

export interface LoginRequest {
    userId: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    name: string;
}

export interface SignUpRequest {
    userId: string;
    password: string;
    name: string;
}