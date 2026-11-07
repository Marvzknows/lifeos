import { Skeleton } from "@/components/ui/skeleton";

const ViewTransactionSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewTransactionSkeleton