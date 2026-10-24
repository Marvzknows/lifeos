"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { budgetSchema, BudgetPayloadT } from "@/schemas/finance/budget-schema";
import { FinanceCategoryT } from "@/app/types/finanace-category";
import { BudgetRowT } from "../types";

type BudgetModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (values: BudgetPayloadT) => void;
    categories: FinanceCategoryT[];
    month: string;
    budget?: BudgetRowT;
    isLoading?: boolean;
}

const getDefaultValues = (
    budget: BudgetRowT | undefined,
    month: string,
): Partial<BudgetPayloadT> => {
    if (budget) {
        return {
            categoryId: budget.category.id,
            amount: budget.budgeted,
            month,
        };
    }
    return { categoryId: "", amount: undefined, month };
}

export function BudgetModal({
    open,
    onOpenChange,
    onSubmit,
    categories,
    month,
    budget,
    isLoading = false,
}: BudgetModalProps) {
    const isEditMode = Boolean(budget);

    const form = useForm<BudgetPayloadT>({
        resolver: zodResolver(budgetSchema),
        defaultValues: getDefaultValues(budget, month),
    });

    function handleSubmit(values: BudgetPayloadT) {
        onSubmit?.(values);
    }

    React.useEffect(() => {
        if (open) {
            form.reset(getDefaultValues(budget, month));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (isLoading) return;
                onOpenChange(next);
            }}
        >
            <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit budget" : "Add budget"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Update the monthly amount for this category."
                            : "Set how much you plan to spend on a category this month."}
                    </DialogDescription>
                </DialogHeader>

                <form id="budget-form" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="categoryId"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                const selected = categories.find((c) => c.id === field.value);

                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="budget-category">Category</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isEditMode}
                                        >
                                            <SelectTrigger
                                                id="budget-category"
                                                aria-invalid={fieldState.invalid}
                                                className="w-full rounded-sm"
                                            >
                                                <SelectValue placeholder="Select a category">
                                                    {selected ? (
                                                        <span className="flex items-center gap-2">
                                                            <DynamicIcon
                                                                name={(selected.icon ?? "circle") as IconName}
                                                                className="size-4"
                                                                style={{ color: selected.color ?? undefined }}
                                                            />
                                                            {selected.name}
                                                        </span>
                                                    ) : isEditMode && budget ? (
                                                        budget.category.name
                                                    ) : null}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.length === 0 ? (
                                                    <div className="px-2 py-3 text-xs text-muted-foreground">
                                                        No expense categories yet. Create one first.
                                                    </div>
                                                ) : (
                                                    categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            <span className="flex items-center gap-2">
                                                                <DynamicIcon
                                                                    name={(category.icon ?? "circle") as IconName}
                                                                    className="size-4"
                                                                    style={{ color: category.color ?? undefined }}
                                                                />
                                                                {category.name}
                                                            </span>
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Controller
                                name="amount"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1">
                                        <FieldLabel htmlFor="budget-amount">Amount</FieldLabel>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                ₱
                                            </span>
                                            <Input
                                                id="budget-amount"
                                                type="number"
                                                inputMode="decimal"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                autoComplete="off"
                                                aria-invalid={fieldState.invalid}
                                                className="rounded-sm pl-7"
                                                name={field.name}
                                                ref={field.ref}
                                                onBlur={field.onBlur}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : e.target.valueAsNumber,
                                                    )
                                                }
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="month"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1">
                                        <FieldLabel htmlFor="budget-month">Month</FieldLabel>
                                        <Input
                                            {...field}
                                            id="budget-month"
                                            type="month"
                                            disabled={isEditMode}
                                            aria-invalid={fieldState.invalid}
                                            className="rounded-sm"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {isEditMode && (
                            <FieldDescription>
                                Category and month can&apos;t be changed. Delete this budget and
                                create a new one instead.
                            </FieldDescription>
                        )}
                    </FieldGroup>
                </form>

                <DialogFooter className="flex-row justify-end gap-2 border-0 bg-transparent pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        className="h-8 flex-1 rounded-sm border border-muted px-3 text-xs hover:bg-accent sm:flex-none"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="budget-form"
                        disabled={isLoading}
                        className="h-8 flex-1 rounded-sm bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-500 disabled:opacity-70 sm:flex-none"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isEditMode ? "Save changes" : "Create budget"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}