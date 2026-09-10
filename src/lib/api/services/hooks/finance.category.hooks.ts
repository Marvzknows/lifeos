import { FinanceCategoriesListResponseT, FinanceCategoryT } from "@/app/types/finanace-category";
import { ApiError } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { financeCategoryService } from "../finance.category.services";
import { toast } from "@/components/ui/toast";
import {
    CreateFinanceCategoryPayloadT,
    UpdateFinanceCategoryPayloadT,
} from "@/schemas/finance/category-schema";

export const financeCategoryKeys = {
    all: ["financeCategories"] as const,

    lists: () => [...financeCategoryKeys.all, "list"] as const,

    details: () => [...financeCategoryKeys.all, "detail"] as const,

    detail: (id: string) => [...financeCategoryKeys.details(), id] as const,
};

// Get category list
export const useFinanceCategories = () => {
    return useQuery<FinanceCategoriesListResponseT, ApiError>({
        queryKey: financeCategoryKeys.lists(),
        queryFn: () => financeCategoryService.getAll(),
    });
};

// Get category by ID
export const useViewFinanceCategory = (id: string) => {
    return useQuery<FinanceCategoryT, ApiError>({
        queryKey: financeCategoryKeys.detail(id),
        queryFn: () => financeCategoryService.getById(id),
        enabled: !!id,
    });
};

// Create category
export const useCreateFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<FinanceCategoryT, ApiError, CreateFinanceCategoryPayloadT>({
        mutationFn: (data) => financeCategoryService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.all,
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to create category",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Update category
export const useUpdateFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<
        FinanceCategoryT,
        ApiError,
        {
            id: string;
            data: UpdateFinanceCategoryPayloadT;
        }
    >({
        mutationFn: ({ id, data }) => financeCategoryService.update(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.detail(variables.id),
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to update category",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Soft delete category
export const useSoftDeleteFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<FinanceCategoryT, ApiError, string>({
        mutationFn: (id) => financeCategoryService.softDelete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.detail(id),
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to delete category",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Restore soft-deleted category
export const useRestoreFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<FinanceCategoryT, ApiError, string>({
        mutationFn: (id) => financeCategoryService.restore(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.detail(id),
            });

            toast.add({
                title: "Category restored",
                description: "Your category has been restored successfully.",
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to restore category",
                description: error.message || "Something went wrong.",
            });
        },
    });
};

// Permanently delete category
export const usePermanentDeleteFinanceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => financeCategoryService.permanentDelete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: financeCategoryKeys.all,
            });

            queryClient.removeQueries({
                queryKey: financeCategoryKeys.detail(id),
            });
        },

        onError: (error) => {
            toast.add({
                title: "Failed to permanently delete category",
                description: error.message || "Something went wrong.",
            });
        },
    });
};