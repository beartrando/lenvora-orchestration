export function parseBody<T>(
    body: Uint8Array,
): T {
    if (body.length === 0) {
        return {} as T;
    }

    return JSON.parse(
        Buffer.from(body).toString(),
    ) as T;
}

export default parseBody;