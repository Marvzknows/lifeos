import { FinanceCategoriesListResponseT, FinanceCategoryT } from "@/app/types/finanace-category";
import { apiClient } from "../axios";
import {
    CreateFinanceCategoryPayloadT,
    UpdateFinanceCategoryPayloadT,
} from "@/schemas/finance/category-schema";

export const financeCategoryService = {
    getAll: async (): Promise<FinanceCategoriesListResponseT> => {
        const { data: response } = await apiClient.get("/finance/category");
        return response;
    },

    getById: async (id: string): Promise<FinanceCategoryT> => {
        const { data: response } = await apiClient.get(`/finance/category/${id}`);
        return response.category;
    },

    create: async (data: CreateFinanceCategoryPayloadT): Promise<FinanceCategoryT> => {
        const { data: response } = await apiClient.post("/finance/category", data);
        return response.category;
    },

    update: async (
        id: string,
        data: UpdateFinanceCategoryPayloadT,
    ): Promise<FinanceCategoryT> => {
        const { data: response } = await apiClient.patch(`/finance/category/${id}`, data);
        return response.category;
    },

    softDelete: async (id: string): Promise<FinanceCategoryT> => {
        const { data: response } = await apiClient.delete(`/finance/category/${id}`);
        return response.category;
    },

    restore: async (id: string): Promise<FinanceCategoryT> => {
        const { data: response } = await apiClient.post(`/finance/category/${id}/restore`);
        return response.category;
    },

    permanentDelete: async (id: string): Promise<void> => {
        await apiClient.delete(`/finance/category/${id}/permanent`);
    },
};