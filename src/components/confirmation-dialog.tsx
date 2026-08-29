"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  intent?: "default" | "destructive" | "success" | "warning";

  title: string;
  description: string;

  icon: LucideIcon;
  iconClassName?: string;

  itemTitle?: string;
  itemSubtitle?: string;
  itemIcon?: LucideIcon;

  confirmText?: string;
  cancelText?: string;

  confirmVariant?: "default" | "destructive";

  loading?: boolean;

  onConfirm: () => void;
  onCancel?: () => void;
}

const intentStyles: Record<
  NonNullable<ConfirmationDialogProps["intent"]>,
  {
    wrapper: string;
    icon: string;
  }
> = {
  default: {
    wrapper: "bg-primary/10",
    icon: "text-primary",
  },
  destructive: {
    wrapper: "bg-destructive/10",
    icon: "text-destructive",
  },
  success: {
    wrapper: "bg-green-100 dark:bg-green-950",
    icon: "text-green-600 dark:text-green-400",
  },
  warning: {
    wrapper: "bg-yellow-100 dark:bg-yellow-950",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  intent = "default",
  title,
  description,
  icon: Icon,
  iconClassName,
  itemTitle,
  itemSubtitle,
  itemIcon: ItemIcon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const styles = intentStyles[intent];

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl p-6">
        <div className="space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full",
                styles.wrapper,
                iconClassName,
              )}
            >
              <Icon className={cn("h-7 w-7", styles.icon)} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-semibold">{title}</h2>

            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Optional Item */}
          {(itemTitle || itemSubtitle) && (
            <div className="flex items-center gap-3 rounded-xl border p-4">
              {ItemIcon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <ItemIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}

              <div className="min-w-0">
                {itemTitle && (
                  <p className="truncate font-medium">{itemTitle}</p>
                )}

                {itemSubtitle && (
                  <p className="text-sm text-muted-foreground">
                    {itemSubtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText}
            </Button>

            <Button
              variant={confirmVariant}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Please wait..." : confirmText}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
