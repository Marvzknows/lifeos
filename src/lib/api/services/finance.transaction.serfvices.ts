import {
    TransactionListFiltersT,
    TransactionsListResponseT,
    TransactionStatsFiltersT,
    TransactionStatsT,
    TransactionT
} from "@/app/types/finanace-transaction";
import { apiClient } from "../axios";
import {
    CreateFinanceTransactionPayloadT,
    UpdateFinanceTransactionPayloadT,
} from "@/schemas/finance/transaction-schema";

export const financeTransactionService = {
    getAll: async (filters?: TransactionListFiltersT): Promise<TransactionsListResponseT> => {
        const { data: response } = await apiClient.get("/finance/transaction", {
            params: {
                ...filters,
                fromDate: filters?.fromDate?.toISOString(),
                toDate: filters?.toDate?.toISOString(),
            },
        });
        return response;
    },

    getById: async (id: string): Promise<TransactionT> => {
        const { data: response } = await apiClient.get(`/finance/transaction/${id}`);
        return response.transaction;
    },

    getStats: async (filters?: TransactionStatsFiltersT): Promise<TransactionStatsT> => {
        const { data: response } = await apiClient.get("/finance/transaction/stats", {
            params: {
                fromDate: filters?.fromDate?.toISOString(),
                toDate: filters?.toDate?.toISOString(),
            },
        });
        return response;
    },

    create: async (data: CreateFinanceTransactionPayloadT): Promise<TransactionT> => {
        const { data: response } = await apiClient.post("/finance/transaction", data);
        return response.transaction;
    },

    update: async (
        id: string,
        data: UpdateFinanceTransactionPayloadT,
    ): Promise<TransactionT> => {
        const { data: response } = await apiClient.patch(`/finance/transaction/${id}`, data);
        return response.transaction;
    },

    softDelete: async (id: string): Promise<TransactionT> => {
        const { data: response } = await apiClient.delete(`/finance/transaction/${id}`);
        return response.transaction;
    },

    restore: async (id: string): Promise<TransactionT> => {
        const { data: response } = await apiClient.post(`/finance/transaction/${id}/restore`);
        return response.transaction;
    },

    permanentDelete: async (id: string): Promise<void> => {
        await apiClient.delete(`/finance/transaction/${id}/permanent`);
    },
};