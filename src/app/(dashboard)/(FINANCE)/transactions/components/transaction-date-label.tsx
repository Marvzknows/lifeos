"use client";

import { DateRangeValue } from "./date-range-filter";
import { format } from "date-fns";

interface TransactionDateLabelProps {
    dateRange: DateRangeValue;
}

function formatDateRangeLabel(dateRange: DateRangeValue): string | null {
    if (!dateRange.from) return null;

    if (!dateRange.to || dateRange.from.toDateString() === dateRange.to.toDateString()) {
        return format(dateRange.from, "MMMM d, yyyy");
    }

    const sameMonth =
        dateRange.from.getMonth() === dateRange.to.getMonth() &&
        dateRange.from.getFullYear() === dateRange.to.getFullYear();

    return sameMonth
        ? `${format(dateRange.from, "MMMM d")} – ${format(dateRange.to, "d, yyyy")}`
        : `${format(dateRange.from, "MMM d, yyyy")} – ${format(dateRange.to, "MMM d, yyyy")}`;
}

export function TransactionDateLabel({ dateRange }: TransactionDateLabelProps) {
    const label = formatDateRangeLabel(dateRange);
    if (!label) return null;
    return <p className="text-sm text-muted-foreground">{label}</p>;
}