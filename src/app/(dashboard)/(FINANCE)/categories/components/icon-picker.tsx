"use client";

import * as React from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FinanceIcon {
    name: IconName;
    label: string;
}

// Curated for a personal finance app. Grouped by which side of the ledger
// they're most associated with — "General" covers icons that fit either.
// Expand these lists as real usage surfaces gaps; no need for the full
// ~1,500 icon library here.
const INCOME_ICONS: FinanceIcon[] = [
    { name: "wallet", label: "Wallet" },
    { name: "briefcase", label: "Briefcase" },
    { name: "trending-up", label: "Trending up" },
    { name: "piggy-bank", label: "Piggy bank" },
    { name: "landmark", label: "Bank" },
    { name: "coins", label: "Coins" },
    { name: "banknote", label: "Banknote" },
    { name: "hand-coins", label: "Hand coins" },
    { name: "badge-dollar-sign", label: "Dollar badge" },
    { name: "gift", label: "Gift" },
];

const EXPENSE_ICONS: FinanceIcon[] = [
    { name: "home", label: "Home" },
    { name: "shopping-cart", label: "Groceries" },
    { name: "utensils", label: "Food and dining" },
    { name: "zap", label: "Utilities" },
    { name: "car", label: "Transportation" },
    { name: "fuel", label: "Fuel" },
    { name: "plane", label: "Travel" },
    { name: "heart-pulse", label: "Health" },
    { name: "graduation-cap", label: "Education" },
    { name: "gamepad-2", label: "Entertainment" },
    { name: "dumbbell", label: "Fitness" },
    { name: "shirt", label: "Shopping" },
    { name: "phone", label: "Phone" },
    { name: "wifi", label: "Internet" },
    { name: "credit-card", label: "Credit card" },
    { name: "receipt", label: "Bills" },
    { name: "dog", label: "Pets" },
    { name: "baby", label: "Childcare" },
];

const GENERAL_ICONS: FinanceIcon[] = [
    { name: "circle-dollar-sign", label: "Dollar sign" },
    { name: "tag", label: "Tag" },
    { name: "more-horizontal", label: "Other" },
];

interface IconPickerProps {
    value: string;
    onChange: (icon: IconName) => void;
    /** Shows the matching group first — pass the form's current `type` field. */
    type?: "INCOME" | "EXPENSE";
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
}

export function IconPicker({
    value,
    onChange,
    type,
    disabled,
    invalid,
    id,
}: IconPickerProps) {
    const [open, setOpen] = React.useState(false);

    const selected = [...INCOME_ICONS, ...EXPENSE_ICONS, ...GENERAL_ICONS].find(
        (icon) => icon.name === value,
    );

    const groups: { heading: string; icons: FinanceIcon[] }[] =
        type === "INCOME"
            ? [
                { heading: "Income", icons: INCOME_ICONS },
                { heading: "Expense", icons: EXPENSE_ICONS },
                { heading: "General", icons: GENERAL_ICONS },
            ]
            : [
                { heading: "Expense", icons: EXPENSE_ICONS },
                { heading: "Income", icons: INCOME_ICONS },
                { heading: "General", icons: GENERAL_ICONS },
            ];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        type="button"
                        id={id}
                        variant="outline"
                        disabled={disabled}
                        aria-invalid={invalid}
                        className="w-full justify-start gap-2 rounded-sm font-normal"
                    >
                        {selected ? (
                            <>
                                <DynamicIcon name={selected.name} className="size-4" />
                                {selected.label}
                            </>
                        ) : (
                            <span className="text-muted-foreground">Choose an icon</span>
                        )}
                    </Button>
                }
            />
            <PopoverContent className="w-64 p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search icons..." />
                    <CommandList className="max-h-72">
                        <CommandEmpty>No icons found.</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.heading} heading={group.heading}>
                                {group.icons.map((icon) => (
                                    <CommandItem
                                        key={icon.name}
                                        value={icon.label}
                                        onSelect={() => {
                                            onChange(icon.name);
                                            setOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center gap-2",
                                            value === icon.name && "bg-accent",
                                        )}
                                    >
                                        <DynamicIcon name={icon.name} className="size-4 shrink-0" />
                                        {icon.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}