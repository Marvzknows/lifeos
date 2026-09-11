"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
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
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { categoryFormSchema, CategoryFormValues } from "@/schemas/finance/category-schema";
import { IconPicker } from "./icon-picker";
import { FinanceCategoryT } from "@/app/types/finanace-category";

const COLOR_OPTIONS = [
    { name: "Purple", value: "#7F77DD" },
    { name: "Teal", value: "#1D9E75" },
    { name: "Coral", value: "#D85A30" },
    { name: "Pink", value: "#D4537E" },
    { name: "Blue", value: "#378ADD" },
    { name: "Green", value: "#639922" },
    { name: "Amber", value: "#BA7517" },
    { name: "Red", value: "#E24B4A" },
    { name: "Gray", value: "#888780" },
];

interface AddCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (values: CategoryFormValues) => void;
    defaultType?: CategoryFormValues["type"];
    category?: FinanceCategoryT;
    isLoading?: boolean;
}

function getDefaultValues(
    category: FinanceCategoryT | undefined,
    defaultType: CategoryFormValues["type"] | undefined,
): CategoryFormValues {
    if (category) {
        return {
            name: category.name,
            type: category.type,
            icon: category.icon ?? "",
            color: category.color ?? "",
        };
    }
    return {
        name: "",
        type: defaultType ?? "EXPENSE",
        icon: "",
        color: "",
    };
}

export function AddCategoryModal({
    open,
    onOpenChange,
    onSubmit,
    defaultType,
    category,
    isLoading = false
}: AddCategoryModalProps) {
    const isEditMode = Boolean(category);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: getDefaultValues(category, defaultType),
    });

    const type = useWatch({ control: form.control, name: "type" });

    function handleSubmit(values: CategoryFormValues) {
        onSubmit?.(values);
    }

    React.useEffect(() => {
        if (open) {
            form.reset(getDefaultValues(category, defaultType));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={(next) => {
            if (isLoading) return;
            onOpenChange(next);
        }}>
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit category" : "Add category"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Update this category's name, type, icon, or color."
                            : "Create a category to organize your income and expenses."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="category-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="category-name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="category-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. Groceries"
                                        autoComplete="off"
                                        className="rounded-sm"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="category-type">Type</FieldLabel>
                                    <ToggleGroup
                                        id="category-type"
                                        value={field.value ? [field.value] : []}
                                        onValueChange={(value: string[]) => {
                                            if (value[0]) field.onChange(value[0]);
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
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <div className="flex gap-4">
                            <Controller
                                name="icon"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1">
                                        <FieldLabel htmlFor="category-icon">Icon</FieldLabel>
                                        <IconPicker
                                            id="category-icon"
                                            value={field.value}
                                            onChange={field.onChange}
                                            type={type}
                                            invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="color"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1">
                                        <FieldLabel htmlFor="category-color">Color</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger
                                                render={
                                                    <Button
                                                        type="button"
                                                        id="category-color"
                                                        variant="outline"
                                                        aria-invalid={fieldState.invalid}
                                                        className="w-full justify-start gap-2 rounded-sm font-normal"
                                                    >
                                                        {field.value ? (
                                                            <>
                                                                <span
                                                                    className="size-4 shrink-0 rounded-full"
                                                                    style={{ backgroundColor: field.value }}
                                                                />
                                                                {COLOR_OPTIONS.find(
                                                                    (c) => c.value === field.value,
                                                                )?.name ?? field.value}
                                                            </>
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                Choose a color
                                                            </span>
                                                        )}
                                                    </Button>
                                                }
                                            />
                                            <PopoverContent className="w-56 p-2" align="start">
                                                <div className="grid grid-cols-5 gap-1">
                                                    {COLOR_OPTIONS.map((c) => (
                                                        <button
                                                            key={c.value}
                                                            type="button"
                                                            onClick={() => field.onChange(c.value)}
                                                            aria-label={c.name}
                                                            className="flex size-9 items-center justify-center rounded-sm border border-transparent transition-colors hover:bg-accent"
                                                        >
                                                            <span
                                                                className="flex size-6 items-center justify-center rounded-full"
                                                                style={{ backgroundColor: c.value }}
                                                            >
                                                                {field.value === c.value && (
                                                                    <Check className="size-3.5 text-white" />
                                                                )}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
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
                        disabled={isLoading}
                        className="h-8 flex-1 rounded-sm bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-500 sm:flex-none disabled:opacity-70"
                        type="submit"
                        form="category-form"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {isEditMode ? "Save changes" : "Create category"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}