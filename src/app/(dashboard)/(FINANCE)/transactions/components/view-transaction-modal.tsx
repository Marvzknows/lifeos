"use client";

import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TransactionT } from "@/app/types/finanace-transaction";
import { cn } from "@/lib/utils";
import ViewTransactionSkeleton from "./view-transaction-skeleton";

const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
});

type ViewTransactionModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction?: TransactionT;
    isLoading?: boolean;
    onEdit: (transaction: TransactionT) => void;
    onDelete: (transaction: TransactionT) => void;
}

const ViewTransactionContent = ({ transaction }: { transaction: TransactionT }) => {
    const isIncome = transaction.category.type === "INCOME";

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p
                    className={cn(
                        "text-2xl font-medium",
                        isIncome
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400",
                    )}
                >
                    {isIncome ? "+" : "-"}
                    {currencyFormatter.format(transaction.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                    {transaction.description || "No description"}
                </p>
            </div>

            <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    {isIncome ? (
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
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm font-medium">{transaction.category.name}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">
                        {format(new Date(transaction.transactionDate), "MMMM d, yyyy")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export const ViewTransactionModal = ({
    open,
    onOpenChange,
    transaction,
    isLoading = false,
    onEdit,
    onDelete,
}: ViewTransactionModalProps) => {
    const isMobile = useIsMobile();

    const title = isLoading ? "Loading..." : "Transaction details";

    const body = isLoading || !transaction
        ? <ViewTransactionSkeleton />
        : <ViewTransactionContent transaction={transaction} />;

    const editButton = (
        <Button
            type="button"
            variant="outline"
            disabled={isLoading || !transaction}
            className="h-8 flex-1 gap-1.5 rounded-sm border border-muted px-3 text-xs hover:bg-accent sm:flex-none"
            onClick={() => transaction && onEdit(transaction)}
        >
            <Pencil className="size-3.5" />
            Edit
        </Button>
    );

    const deleteButton = (
        <Button
            type="button"
            variant="outline"
            disabled={isLoading || !transaction}
            className="h-8 flex-1 gap-1.5 rounded-sm border border-destructive/30 px-3 text-xs text-destructive hover:bg-destructive/10 sm:flex-none"
            onClick={() => transaction && onDelete(transaction)}
        >
            <Trash2 className="size-3.5" />
            Delete
        </Button>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription className="sr-only">
                            View transaction details, or edit or delete this transaction.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4">{body}</div>
                    <DrawerFooter className="flex-row gap-2 pt-2">
                        {editButton}
                        {deleteButton}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="sr-only">
                        View transaction details, or edit or delete this transaction.
                    </DialogDescription>
                </DialogHeader>
                {body}
                <DialogFooter className="flex-row justify-end gap-2 border-0 bg-transparent pt-2">
                    {editButton}
                    {deleteButton}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}