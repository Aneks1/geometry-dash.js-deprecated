export default (data: string[]): Record<string, string> => {
    const formatted = [];
    for (let i = 0; i < data.length; i += 2) {
        formatted.push([data[i], data[i + 1]]);
    }
    return Object.fromEntries(formatted);
};
