import { FinanceCategoryT } from "@/app/types/finanace-category";
import AddCategoryPill from "./add-category-pill";
import CategoryPill from "./category-pill";
import CategoryPillSkeleton from "./category-pill-skeleton";

const CategorySection = ({
    title,
    categories,
    onCategoryClick,
    onAddClick,
    onDeleteCategory,
    isLoading = false,
}: {
    title: string;
    categories: FinanceCategoryT[];
    onCategoryClick: (category: FinanceCategoryT) => void;
    onAddClick: () => void;
    onDeleteCategory: (id: string) => void;
    isLoading?: boolean;
}) => {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {isLoading ? (
                    <CategoryPillSkeleton />
                ) : (
                    <>
                        {categories.map((category) => (
                            <CategoryPill
                                key={category.id}
                                category={category}
                                onClick={onCategoryClick}
                                onDelete={() => onDeleteCategory(category.id)}
                            />
                        ))}
                        <AddCategoryPill onClick={onAddClick} />
                    </>
                )}
            </div>
        </div>
    );
};

export default CategorySection;