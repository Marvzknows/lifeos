import { apiClient } from "../axios";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: "USER" | "ADMIN";
};

export type MeResponseT = {
  user: AuthUser | null;
};

export const authService = {
  me: async (): Promise<MeResponseT> => {
    const { data } = await apiClient.get<MeResponseT>("/me");
    return data;
  },
};

export default authService;
