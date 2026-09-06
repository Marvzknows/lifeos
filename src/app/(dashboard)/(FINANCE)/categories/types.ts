export type CategoryType = "INCOME" | "EXPENSE";

export type CategoryT = {
    id: string;
    name: string;
    type: CategoryType;
    icon: string | null;
    color: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export const COLOR_OPTIONS = [
    { name: "Purple", value: "#7F77DD" },
    { name: "Teal", value: "#1D9E75" },
    { name: "Coral", value: "#D85A30" },
    { name: "Pink", value: "#D4537E" },
    { name: "Blue", value: "#378ADD" },
    { name: "Green", value: "#639922" },
    { name: "Amber", value: "#BA7517" },
    { name: "Red", value: "#E24B4A" },
    { name: "Gray", value: "#888780" },
];