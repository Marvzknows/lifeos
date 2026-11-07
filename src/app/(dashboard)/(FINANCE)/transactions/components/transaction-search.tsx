"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TransactionSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function TransactionSearch({
    value,
    onChange,
    placeholder = "Search transactions...",
}: TransactionSearchProps) {
    return (
        <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-8"
            />
        </div>
    );
}