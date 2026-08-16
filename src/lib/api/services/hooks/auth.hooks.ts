import { useQuery } from "@tanstack/react-query";
import authService, { MeResponseT } from "../auth.services";
import { ApiError } from "../../axios";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export const useMe = () => {
  return useQuery<MeResponseT, ApiError>({
    queryKey: authKeys.me,
    queryFn: authService.me,
  });
};
