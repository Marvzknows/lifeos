"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Check, Trash2 } from "lucide-react";
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
    /** Pre-selects Income/Expense when opened from a specific section's "+ Add" pill. */
    defaultType?: CategoryFormValues["type"];
    /** When set, the modal opens pre-filled in edit mode instead of create mode. */
    category?: FinanceCategoryT;
    /** Only relevant in edit mode — shows a "Delete category" action in the footer. */
    onDelete?: (category: FinanceCategoryT) => void;
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
    onDelete,
}: AddCategoryModalProps) {
    const isEditMode = Boolean(category);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: getDefaultValues(category, defaultType),
    });

    const type = useWatch({ control: form.control, name: "type" });

    function handleSubmit(values: CategoryFormValues) {
        onSubmit?.(values);
        onOpenChange(false);
    }

    React.useEffect(() => {
        if (open) {
            form.reset(getDefaultValues(category, defaultType));
        }
        // category/defaultType are read fresh each time the modal opens, not
        // tracked reactively while it's open — re-opening for a different
        // category is what should trigger the reset, not every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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

                <DialogFooter className="flex-col gap-2 border-0 bg-transparent pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    {isEditMode && onDelete ? (
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
                            onClick={() => {
                                onDelete(category!);
                                onOpenChange(false);
                            }}
                        >
                            <Trash2 className="size-4" />
                            Delete category
                        </Button>
                    ) : (
                        <span className="hidden sm:block" />
                    )}
                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 w-full rounded-sm border border-muted px-3 text-xs hover:bg-accent sm:w-auto"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="h-8 w-full rounded-sm bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-500 sm:w-auto"
                            type="submit"
                            form="category-form"
                        >
                            {isEditMode ? "Save changes" : "Create category"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}