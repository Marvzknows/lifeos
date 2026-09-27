
import { ApiError } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
    CreateFinanceTransactionPayloadT,
    UpdateFinanceTransactionPayloadT,
} from "@/schemas/finance/transaction-schema";
import {
    TransactionListFiltersT,
    TransactionsListResponseT,
    TransactionStatsFiltersT,
    TransactionStatsT,
    TransactionT
} from "@/app/types/finanace-transaction";
import { financeTransactionService } from "../finance.transaction.serfvices";

export const financeTransactionKeys = {
    all: ["financeTransactions"] as const,

    lists: () => [...financeTransactionKeys.all, "list"] as const,
    list: (filters?: TransactionListFiltersT) =>
        [...financeTransactionKeys.lists(), filters ?? {}] as const,

    details: () => [...financeTransactionKeys.all, "detail"] as const,
    detail: (id: string) => [...financeTransactionKeys.details(), id] as const,

    stats: () => [...financeTransactionKeys.all, "stats"] as const,
    statsByFilters: (filters?: TransactionStatsFiltersT) =>
        [...financeTransactionKeys.stats(), filters ?? {}] as const,
};

// Get paginated transaction list with filters
export const useFinanceTransactions = (filters?: TransactionListFiltersT) => {
    return useQuery<TransactionsListResponseT, ApiError>({
        queryKey: financeTransactionKeys.list(filters),
        queryFn: () => financeTransactionService.getAll(filters),
        placeholderData: (previousData) => previousData,
    });
};

// Get transaction by ID
export const useViewFinanceTransaction = (id: string) => {
    return useQuery<TransactionT, ApiError>({
        queryKey: financeTransactionKeys.detail(id),
        queryFn: () => financeTransactionService.getById(id),
        enabled: !!id,
    });
};

// Get transaction stats (total income, expenses, net balance) for a date range
export const useFinanceTransactionStats = (filters?: TransactionStatsFiltersT) => {
    return useQuery<TransactionStatsT, ApiError>({
        queryKey: financeTransactionKeys.statsByFilters(filters),
        queryFn: () => financeTransactionService.getStats(filters),
        placeholderData: (previousData) => previousData,
    });
};

// Create transaction
export const useCreateFinanceTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<TransactionT, ApiError, CreateFinanceTransactionPayloadT>({
        mutationFn: (data) => financeTransactionService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.all,
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to create transaction",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Update transaction
export const useUpdateFinanceTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<TransactionT, ApiError, { id: string; data: UpdateFinanceTransactionPayloadT; }>({
        mutationFn: ({ id, data }) => financeTransactionService.update(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.stats(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.detail(variables.id),
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to update transaction",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Soft delete transaction
export const useSoftDeleteFinanceTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<TransactionT, ApiError, string>({
        mutationFn: (id) => financeTransactionService.softDelete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.stats(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.detail(id),
            });

            toast.add({
                title: "Transaction deleted",
                description: "The transaction was moved to trash.",
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to delete transaction",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Restore soft-deleted transaction
export const useRestoreFinanceTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<TransactionT, ApiError, string>({
        mutationFn: (id) => financeTransactionService.restore(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.stats(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.detail(id),
            });

            toast.add({
                title: "Transaction restored",
                description: "Your transaction has been restored successfully.",
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to restore transaction",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Permanently delete transaction
export const usePermanentDeleteFinanceTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => financeTransactionService.permanentDelete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: financeTransactionKeys.stats(),
            });

            queryClient.removeQueries({
                queryKey: financeTransactionKeys.detail(id),
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to permanently delete transaction",
                description: error.message || "Something went wrong.",
            });
        },
    });
};