import { DateRangeValue } from "@/app/(dashboard)/(FINANCE)/transactions/components/date-range-filter";
import { TransactionTypeFilter } from "@/app/(dashboard)/(FINANCE)/transactions/components/transaction-type-filter";
import { TransactionT } from "@/app/types/finanace-transaction";

interface FilterOptions {
    typeFilter?: TransactionTypeFilter;
    categoryFilter?: string;
    search?: string;
    dateRange: DateRangeValue;
}

export function filterTransactions(
    transactions: TransactionT[],
    { typeFilter, categoryFilter, search, dateRange }: FilterOptions
): TransactionT[] {
    return transactions.filter((txn) => {
        const matchesType = !typeFilter || typeFilter === "ALL" || txn.type === typeFilter;
        const matchesCategory =
            !categoryFilter || categoryFilter === "ALL" || txn.category.id === categoryFilter;
        const matchesSearch =
            !search || txn.description.toLowerCase().includes(search.toLowerCase());

        const txnDate = new Date(txn.transactionDate);
        const matchesFrom = !dateRange.from || txnDate >= dateRange.from;
        const matchesTo = !dateRange.to || txnDate <= dateRange.to;

        return matchesType && matchesCategory && matchesSearch && matchesFrom && matchesTo;
    });
}