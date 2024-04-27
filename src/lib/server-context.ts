import "server-only";
import { cache } from "react";

type ContextKey = "lang" | "uid" | "type";

const serverContext = cache(() => {
    return new Map<ContextKey, string>();
});

export const setServerContext = (key: ContextKey, value: string) =>
    serverContext().set(key, value);

export const getServerContext = (key: ContextKey) => serverContext().get(key);
