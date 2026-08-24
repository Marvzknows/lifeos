import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskStatCardSkeleton() {
    return (
        <Card className="rounded-sm">
            <CardContent className="space-y-6 p-6">
                <div className="flex flex-row justify-between gap-4 md:justify-start">
                    <Skeleton className="h-14 w-14 rounded-lg" />

                    <div className="flex flex-col justify-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-9 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}