import { BudgetsListResponseT, BudgetT } from "@/app/(dashboard)/(FINANCE)/budget/types";
import { apiClient } from "../axios";
import { BudgetPayloadT, UpdateBudgetPayloadT } from "@/schemas/finance/budget-schema";

export const financeBudgetService = {
    getAll: async (month: string): Promise<BudgetsListResponseT> => {
        const { data: response } = await apiClient.get("/finance/budget", {
            params: { month },
        });
        return response;
    },

    getById: async (id: string): Promise<BudgetT> => {
        const { data: response } = await apiClient.get(`/finance/budget/${id}`);
        return response.budget;
    },

    create: async (data: BudgetPayloadT): Promise<BudgetT> => {
        const { data: response } = await apiClient.post("/finance/budget", data);
        return response.budget;
    },

    update: async (id: string, data: UpdateBudgetPayloadT): Promise<BudgetT> => {
        const { data: response } = await apiClient.patch(`/finance/budget/${id}`, data);
        return response.budget;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/finance/budget/${id}`);
    },
};