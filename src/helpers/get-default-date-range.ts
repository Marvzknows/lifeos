const getDefaultDateRange = (): {
    from: Date;
    to: Date
} => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: startOfMonth, to: now };
}
export default getDefaultDateRange;