import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const AddCategoryPill = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5",
                "text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            )}
        >
            <Plus className="size-3.5" />
            Add
        </button>
    );
}

export default AddCategoryPill;