import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/api/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};