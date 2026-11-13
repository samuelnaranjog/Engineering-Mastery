// This variable lives entirely in RAM. It dies on refresh.
let inMemoryToken: string | null = null;

export const getToken = () => inMemoryToken;
export const setToken = (token: string | null) => {
  inMemoryToken = token;
};

// Pure decoder: reads payload only when called, does NOT manipulate queryClient
export function parseJwt<T = Record<string, any>>(token: string | null): T | null {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}