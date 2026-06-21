export function filterByFields<T>(records: T[], searchText: string, fields: string[]): T[] {
    if (!records?.length) {
        return [];
    }
    if (!searchText?.trim()) {
        return [...records];
    }
    const search = searchText.trim().toLowerCase();
    return records.filter(record =>
        fields.some(field => {
            const value = field
                .split('.')
                .reduce((obj: any, key) => obj?.[key], record);
            return String(value ?? '')
                .toLowerCase()
                .includes(search);
        })
    );
}