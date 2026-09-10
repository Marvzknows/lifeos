import { FinanceCategoriesListResponseT } from "@/app/types/finanace-category";
import { ApiError } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { financeCategoryService } from "../finance.category.services";

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