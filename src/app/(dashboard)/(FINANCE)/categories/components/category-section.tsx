import { CategoryT } from "../types";
import AddCategoryPill from "./add-category-pill";
import CategoryPill from "./category-pill";

const CategorySection = ({
    title,
    categories,
    onCategoryClick,
    onAddClick,
}: {
    title: string;
    categories: CategoryT[];
    onCategoryClick: (category: CategoryT) => void;
    onAddClick: () => void;
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
                    />
                ))}
                <AddCategoryPill onClick={onAddClick} />
            </div>
        </div>
    );
}

export default CategorySection;