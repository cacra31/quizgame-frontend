import { api } from "@/shared/api/apiClient";
import type { RoomListResponse, RoomRequest, RoomResponse } from "@/types/roomType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRoomListQuery = () => {
    return useQuery({
        queryKey: ["roomList"],
        queryFn: async () => {
            const res = await api.get<RoomListResponse[]>("/api/v1/room/list");
            return res.data;
        },
        staleTime: 1000,
    });
};

export const useRoomQuery = (roomId: number) => {
    return useQuery({
        queryKey: ["room"],
        queryFn: async () => {
            const res = await api.get<RoomResponse>(`/api/v1/room/${roomId}`);
            return res.data;
        },
        staleTime: 1000,
    });
};

export const useRoomEnterMutation = () => {
    return useMutation({
        mutationFn: (categoryId: number) =>
            api.post<RoomRequest>("/api/v1/room/enter", { categoryId }),
    });
}

export const useRoomLeaveMutation = () => {
    return useMutation({
        mutationFn: () =>
            api.post<RoomRequest>("/api/v1/room/leave"),
    });
}