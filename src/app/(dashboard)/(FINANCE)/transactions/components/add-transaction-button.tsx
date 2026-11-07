"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTransactionButtonProps {
    onClick?: () => void;
}

export function AddTransactionButton({ onClick }: AddTransactionButtonProps) {
    return (
        <Button onClick={onClick} className="h-8 text-xs w-full rounded-sm bg-indigo-600 px-3 text-white hover:bg-indigo-500 sm:w-auto">
            <Plus className="size-4" />
            Add transaction
        </Button>
    );
}