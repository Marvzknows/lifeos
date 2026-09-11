import { FinanceCategoryT } from "@/app/types/finanace-category";
import AddCategoryPill from "./add-category-pill";
import CategoryPill from "./category-pill";

const CategorySection = ({
    title,
    categories,
    onCategoryClick,
    onAddClick,
    onDeleteCategory,
}: {
    title: string;
    categories: FinanceCategoryT[];
    onCategoryClick: (category: FinanceCategoryT) => void;
    onAddClick: () => void;
    onDeleteCategory: (category: FinanceCategoryT) => void;
}) => {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <CategoryPill
                        key={category.id}
                        category={category}
                        onClick={onCategoryClick}
                        onDelete={onDeleteCategory}
                    />
                ))}
                <AddCategoryPill onClick={onAddClick} />
            </div>
        </div>
    );
}

export default CategorySection;