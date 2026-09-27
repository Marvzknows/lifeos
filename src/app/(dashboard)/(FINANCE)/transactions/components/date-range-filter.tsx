"use client";

import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DateRangeValue = {
    from?: Date;
    to?: Date;
}

type DateRangeFilterProps = {
    value: DateRangeValue;
    onChange: (value: DateRangeValue) => void;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
    const [open, setOpen] = React.useState(false);

    const label = React.useMemo(() => {
        if (value.from && value.to) {
            return `${format(value.from, "MMM d")} - ${format(value.to, "MMM d, yyyy")}`;
        }
        if (value.from) {
            return `From ${format(value.from, "MMM d, yyyy")}`;
        }
        return "Date range";
    }, [value]);

    const hasValue = Boolean(value.from || value.to);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-full justify-start gap-2 rounded-sm font-normal sm:w-auto",
                            !hasValue && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="size-4 shrink-0" />
                        <span className="truncate">{label}</span>
                        {hasValue && (
                            <span
                                role="button"
                                tabIndex={0}
                                aria-label="Clear date range"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChange({});
                                }}
                                className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full hover:bg-muted"
                            >
                                <X className="size-3" />
                            </span>
                        )}
                    </Button>
                }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={value as DateRange}
                    onSelect={(range) => onChange(range ?? {})}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
}