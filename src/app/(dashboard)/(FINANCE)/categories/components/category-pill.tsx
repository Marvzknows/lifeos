"use client";

import { X } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { FinanceCategoryT } from "@/app/types/finanace-category";

const CategoryPill = ({
    category,
    onClick,
    onDelete,
}: {
    category: FinanceCategoryT;
    onClick: (category: FinanceCategoryT) => void;
    onDelete: (category: FinanceCategoryT) => void;
}) => {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onClick(category)}
            onKeyDown={(e) => e.key === "Enter" && onClick(category)}
            className={cn(
                "group relative inline-flex items-center gap-2 rounded-full border bg-card py-1.5 pl-3 pr-2",
                "cursor-pointer text-sm transition-colors hover:bg-accent",
            )}
        >
            <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${category.color ?? "#94a3b8"}20` }}
            >
                <DynamicIcon
                    name={(category.icon ?? "circle") as IconName}
                    className="size-3"
                    style={{ color: category.color ?? "#94a3b8" }}
                />
            </span>
            <span className="pr-1">{category.name}</span>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category);
                }}
                aria-label={`Delete ${category.name}`}
                className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground",
                    "opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive",
                    "supports-[hover:hover]:opacity-0 supports-[hover:hover]:group-hover:opacity-100",
                    "focus-visible:opacity-100",
                )}
            >
                <X className="size-3" />
            </button>
        </div>
    );
};

export default CategoryPill;