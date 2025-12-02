import type { AnswerRequest } from './../../../types/answerType';
import { api } from "@/shared/api/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useSubmitAnswerMutation = () => {
    return useMutation({
        mutationFn: (request: AnswerRequest) =>
            api.post<AnswerRequest>("/api/v1/room/enter", request),
    });
}