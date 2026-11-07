import { Skeleton } from "@/components/ui/skeleton";
const WIDTHS = ["w-16", "w-20", "w-24", "w-14", "w-28"];

const CategoryPillSkeleton = ({ count = 4 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full border bg-card py-1.5 pl-3 pr-3"
                >
                    <Skeleton className="size-5 shrink-0 rounded-full" />
                    <Skeleton className={`h-3.5 ${WIDTHS[i % WIDTHS.length]}`} />
                </div>
            ))}
        </>
    );
};

export default CategoryPillSkeleton;