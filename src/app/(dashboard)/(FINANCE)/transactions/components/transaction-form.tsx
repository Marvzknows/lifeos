"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    transactionFormSchema,
    TransactionFormValues,
} from "@/schemas/finance/transaction-schema";
import { useFinanceCategories } from "@/lib/api/services/hooks/finance.category.hooks";
import { FinanceCategoryT } from "@/app/types/finanace-category";
import { TransactionT } from "@/app/types/finanace-transaction";

interface TransactionFormProps {
    formId: string;
    defaultType?: "INCOME" | "EXPENSE";
    /** When provided, the form is pre-filled for editing this transaction. */
    transaction?: TransactionT;
    onSubmit: (values: TransactionFormValues) => void;
}

const getDefaultValues = (
    transaction: TransactionT | undefined,
    defaultType: "INCOME" | "EXPENSE",
): TransactionFormValues => {
    if (transaction) {
        return {
            description: transaction.description ?? "",
            amount: String(transaction.amount),
            type: transaction.category.type,
            categoryId: transaction.category.id,
            transactionDate: new Date(transaction.transactionDate),
        };
    }
    return {
        description: "",
        amount: "",
        type: defaultType,
        categoryId: "",
        transactionDate: new Date(),
    };
}

export function TransactionForm({
    formId,
    defaultType = "EXPENSE",
    transaction,
    onSubmit,
}: TransactionFormProps) {
    const { data: categoriesData, isLoading: isLoadingCategories } = useFinanceCategories();

    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: getDefaultValues(transaction, defaultType),
    });

    // Re-sync the form whenever a different transaction is passed in (or the
    // modal switches from create to edit), since defaultValues only apply
    // on first mount otherwise.
    useEffect(() => {
        form.reset(getDefaultValues(transaction, defaultType));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction?.id]);

    const type = useWatch({ control: form.control, name: "type" });

    const expenseCategories = categoriesData?.data.expense.map((category: FinanceCategoryT) => ({
        id: category.id,
        name: category.name
    })) ?? [];

    const incomeCategories = categoriesData?.data.income.map((category: FinanceCategoryT) => ({
        id: category.id,
        name: category.name
    })) ?? [];

    const filteredCategories = type === "INCOME" ? incomeCategories : expenseCategories;

    return (
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-type">Type</FieldLabel>
                            <ToggleGroup
                                id="transaction-type"
                                value={field.value ? [field.value] : []}
                                onValueChange={(value: string[]) => {
                                    if (value[0]) {
                                        field.onChange(value[0]);
                                        form.setValue("categoryId", "");
                                    }
                                }}
                                className="w-full"
                            >
                                <ToggleGroupItem value="INCOME" className="flex-1">
                                    Income
                                </ToggleGroupItem>
                                <ToggleGroupItem value="EXPENSE" className="flex-1">
                                    Expense
                                </ToggleGroupItem>
                            </ToggleGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="amount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-amount">Amount</FieldLabel>
                            <Input
                                {...field}
                                id="transaction-amount"
                                inputMode="decimal"
                                aria-invalid={fieldState.invalid}
                                placeholder="0.00"
                                autoComplete="off"
                                className="rounded-sm"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-category">Category</FieldLabel>
                            <Select
                                value={field.value || "__placeholder"}
                                onValueChange={(val) => {
                                    if (val && val !== "__placeholder") field.onChange(val);
                                }}
                                disabled={isLoadingCategories}
                            >
                                <SelectTrigger
                                    id="transaction-category"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full rounded-sm"
                                >
                                    <SelectValue placeholder="Select a category">
                                        {(val: string) =>
                                            val === "__placeholder"
                                                ? "Select a category"
                                                : filteredCategories.find((c) => c.id === val)?.name
                                        }
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__placeholder" disabled className="text-muted-foreground">
                                        Select a category
                                    </SelectItem>
                                    {isLoadingCategories ? (
                                        <SelectItem disabled value="__loading">Loading...</SelectItem>
                                    ) : filteredCategories.length === 0 ? (
                                        <SelectItem disabled value="__empty">No categories yet</SelectItem>
                                    ) : (
                                        filteredCategories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="transactionDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-date">Date</FieldLabel>
                            <Popover>
                                <PopoverTrigger
                                    render={
                                        <Button
                                            type="button"
                                            id="transaction-date"
                                            variant="outline"
                                            aria-invalid={fieldState.invalid}
                                            className="w-full justify-start gap-2 rounded-sm font-normal"
                                        >
                                            <CalendarIcon className="size-4" />
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Pick a date
                                                </span>
                                            )}
                                        </Button>
                                    }
                                />
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => date && field.onChange(date)}
                                    />
                                </PopoverContent>
                            </Popover>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-description">
                                Description
                            </FieldLabel>
                            <Input
                                {...field}
                                id="transaction-description"
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g. Grocery shopping"
                                autoComplete="off"
                                className="rounded-sm"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}