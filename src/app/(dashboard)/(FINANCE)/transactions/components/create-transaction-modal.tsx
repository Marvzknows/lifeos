"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { TransactionForm } from "./transaction-form";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { TransactionT } from "@/app/types/finanace-transaction";

interface TransactionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Present for edit mode; omitted for create mode. */
    transaction?: TransactionT;
    onSubmit?: (values: TransactionFormValues) => void;
    isLoading?: boolean;
}

const FORM_ID = "transaction-form";

export function TransactionModal({
    open,
    onOpenChange,
    transaction,
    onSubmit,
    isLoading = false,
}: TransactionModalProps) {
    const isMobile = useIsMobile();
    const isEditMode = Boolean(transaction);

    function handleSubmit(values: TransactionFormValues) {
        onSubmit?.(values);
    }

    const title = isEditMode ? "Edit transaction" : "Add transaction";
    const description = isEditMode
        ? "Update this transaction's details."
        : "Record a new income or expense.";

    const formBody = (
        <TransactionForm
            key={transaction?.id ?? "create"}
            formId={FORM_ID}
            transaction={transaction}
            onSubmit={handleSubmit}
        />
    );

    const submitButton = (
        <Button
            disabled={isLoading}
            className="h-8 flex-1 rounded-sm bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-500 sm:flex-none disabled:opacity-70"
            type="submit"
            form={FORM_ID}
        >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEditMode ? "Save changes" : "Add transaction"}
        </Button>
    );

    const cancelButton = (
        <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="h-8 flex-1 rounded-sm border border-muted px-3 text-xs hover:bg-accent sm:flex-none"
            onClick={() => onOpenChange(false)}
        >
            Cancel
        </Button>
    );

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={(next) => {
                    if (isLoading) return;
                    onOpenChange(next);
                }}
            >
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4">{formBody}</div>
                    <DrawerFooter className="flex-row gap-2 pt-2">
                        {cancelButton}
                        {submitButton}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (isLoading) return;
                onOpenChange(next);
            }}
        >
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {formBody}
                <DialogFooter className="flex-row justify-end gap-2 border-0 bg-transparent pt-2">
                    {cancelButton}
                    {submitButton}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}