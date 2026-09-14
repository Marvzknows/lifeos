"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type CategoryOption = {
    id: string;
    name: string;
}

type CategoryFilterProps = {
    categories: CategoryOption[];
    value: string;
    onChange: (value: string) => void;
}

export function CategoryFilter({
    categories,
    value,
    onChange,
}: CategoryFilterProps) {
    return (
        <Select
            value={value}
            onValueChange={(val) => {
                if (val) onChange(val);
            }}
        >
            <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}