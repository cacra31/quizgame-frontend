import type { UserDto } from "./userType";

export interface RoomResponse {
    roomId: number;
    categoryId: number;
    categoryName: number;
    createdAt: string;
    users: UserDto[];
}

export interface RoomListResponse {
    roomId: string | null;
    categoryId: number;
    categoryName: string;
    currentPlayer: number | null;
    maxPlayer: number | null;
    createdAt: string | null;
}

export interface RoomRequest {
    roomId: number | null;
    categoryId: number | null;
}