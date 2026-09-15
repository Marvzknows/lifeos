"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumn } from "@/components/data-table/data-table";
import { TransactionT } from "@/app/types/finanace-transaction";

const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

export const transactionColumns: DataTableColumn<TransactionT>[] = [
    {
        id: "description",
        header: "Description",
        sortable: true,
        sortAccessor: (row) => row.description,
        cell: (row) => (
            <div className="space-y-0.5">
                <p className="font-medium text-foreground">{row.description}</p>
                <p className="text-xs text-muted-foreground">
                    {row.category.name}
                </p>
            </div>
        ),
    },
    {
        id: "type",
        header: "Type",
        sortable: true,
        sortAccessor: (row) => row.type,
        cell: (row) =>
            row.type === "INCOME" ? (
                <Badge
                    variant="outline"
                    className="gap-1 border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                >
                    <ArrowUpRight className="size-3" />
                    Income
                </Badge>
            ) : (
                <Badge
                    variant="outline"
                    className="gap-1 border-red-200 bg-red-100 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                >
                    <ArrowDownLeft className="size-3" />
                    Expense
                </Badge>
            ),
    },
    {
        id: "date",
        header: "Date",
        sortable: true,
        sortAccessor: (row) => new Date(row.transactionDate),
        cell: (row) => dateFormatter.format(new Date(row.transactionDate)),
    },
    {
        id: "amount",
        header: "Amount",
        sortable: true,
        sortAccessor: (row) => row.amount,
        className: "text-right",
        cell: (row) => (
            <span
                className={
                    row.type === "INCOME"
                        ? "font-medium text-green-700 dark:text-green-400"
                        : "font-medium text-red-700 dark:text-red-400"
                }
            >
                {row.type === "INCOME" ? "+" : "-"}
                {currencyFormatter.format(row.amount)}
            </span>
        ),
    },
];