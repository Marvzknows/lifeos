import { cn } from "@/lib/utils";
import { CategoryT } from "../types";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

const CategoryPill = ({
    category,
    onClick,
}: {
    category: CategoryT;
    onClick: (category: CategoryT) => void;
}) => {
    return (
        <button
            type="button"
            onClick={() => onClick(category)}
            className={cn(
                "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5",
                "text-sm transition-colors hover:bg-accent",
            )}
        >
            <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${category.color ?? "#94a3b8"}20` }}
            >
                <DynamicIcon
                    name={(category.icon ?? "circle") as IconName}
                    className="size-3"
                    color={category.color ?? "#94a3b8"}
                />
            </span>
            {category.name}
        </button>
    );
}

export default CategoryPill;