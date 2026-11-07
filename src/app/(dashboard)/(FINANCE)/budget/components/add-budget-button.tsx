import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddBudgetButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="h-8 rounded-sm bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-500"
        >
            <Plus className="size-4" />
            Add Budget
        </Button>
    );
};

export default AddBudgetButton;