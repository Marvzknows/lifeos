
import { BudgetRowT, BudgetStatus } from "@/app/(dashboard)/(FINANCE)/budget/types";

export function getBudgetStatus(row: BudgetRowT): Exclude<BudgetStatus, "all"> {
    if (row.remaining < 0) return "over";
    if (row.progress >= 80) return "warning";
    return "on-track";
}

export function countByStatus(rows: BudgetRowT[]): Record<BudgetStatus, number> {
    const counts: Record<BudgetStatus, number> = {
        all: rows.length,
        "on-track": 0,
        warning: 0,
        over: 0,
    };
    for (const row of rows) counts[getBudgetStatus(row)]++;
    return counts;
}