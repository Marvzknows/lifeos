import { LifeOsIcon } from "./icons/life-os-icon";

export function FullPageLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <LifeOsIcon className="h-5 w-5" />
      </div>
      <div className="flex items-center gap-2">
        <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
        <p className="text-sm text-muted-foreground">Loading LifeOS...</p>
      </div>
    </div>
  );
}
