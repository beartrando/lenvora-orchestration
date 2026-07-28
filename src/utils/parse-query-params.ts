export function parseQueryParams<T>(
    queryParams: { key: string; value: string }[],
): T {
    const result: Record<string, string> = {};

    for (const { key, value } of queryParams) {
        result[key] = value;
    }

    return result as T;
}

export default parseQueryParams;