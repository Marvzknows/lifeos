export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
      <div className="h-64 w-full animate-pulse rounded-xl bg-muted/50" />
    </div>
  );
}
