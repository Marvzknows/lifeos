"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Check } from "lucide-react";
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
import { CategoryType, COLOR_OPTIONS } from "../types";

type AddCategoryModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (values: CategoryFormValues) => void;
    defaultType?: CategoryType;
};

export function AddCategoryModal({
    open,
    onOpenChange,
    onSubmit,
    defaultType,
}: AddCategoryModalProps) {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "",
            type: defaultType ?? "EXPENSE",
            icon: "",
            color: "",
        },
    });

    function handleSubmit(values: CategoryFormValues) {
        onSubmit?.(values);
        onOpenChange(false);
    }

    React.useEffect(() => {
        if (open) {
            form.reset({
                name: "",
                type: defaultType ?? "EXPENSE",
                icon: "",
                color: "",
            });
        }
    }, [open, defaultType, form]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>Add category</DialogTitle>
                    <DialogDescription>
                        Create a category to organize your income and expenses.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="add-category-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="add-category-name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="add-category-name"
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
                                    <FieldLabel htmlFor="add-category-type">Type</FieldLabel>
                                    <ToggleGroup
                                        id="add-category-type"
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
                                        <FieldLabel htmlFor="add-category-icon">Icon</FieldLabel>
                                        <IconPicker
                                            id="add-category-icon"
                                            value={field.value}
                                            onChange={field.onChange}
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
                                        <FieldLabel htmlFor="add-category-color">
                                            Color
                                        </FieldLabel>
                                        <Popover>
                                            <PopoverTrigger
                                                render={
                                                    <Button
                                                        type="button"
                                                        id="add-category-color"
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

                <DialogFooter className="pt-2 bg-transparent border-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="add-category-form">
                        Create category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}