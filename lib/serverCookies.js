import { headers, cookies } from "next/headers";

export async function getCookieValue(name) {
  try {
    const storeMaybe = cookies();
    const store =
      storeMaybe && typeof storeMaybe.then === "function"
        ? await storeMaybe
        : storeMaybe;

    if (store) {
      if (typeof store.get === "function") {
        const cookie = store.get(name);
        if (cookie?.value) {
          return cookie.value;
        }
      }

      if (typeof store.getAll === "function") {
        const list = store.getAll(name);
        if (Array.isArray(list) && list.length > 0) {
          const value = list[0]?.value;
          if (value) return value;
        }
      }

      if (typeof store[Symbol.iterator] === "function") {
        for (const entry of store) {
          if (entry?.name === name && entry?.value) {
            return entry.value;
          }
        }
      }
    }
  } catch {
    // fallback to headers below
  }

  try {
    const requestHeaders = headers();
    const headerMaybe =
      requestHeaders && typeof requestHeaders.then === "function"
        ? await requestHeaders
        : requestHeaders;

    let cookieHeader = "";

    if (headerMaybe) {
      if (typeof headerMaybe.get === "function") {
        cookieHeader = headerMaybe.get("cookie") ?? "";
      } else if (
        typeof headerMaybe === "object" &&
        headerMaybe !== null &&
        "cookie" in headerMaybe
      ) {
        cookieHeader = headerMaybe.cookie ?? "";
      }
    }

    if (!cookieHeader) {
      return undefined;
    }

    const match = cookieHeader
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${name}=`));

    if (!match) return undefined;

    const value = match.slice(name.length + 1);
    return decodeURIComponent(value);
  } catch {
    return undefined;
  }
}

