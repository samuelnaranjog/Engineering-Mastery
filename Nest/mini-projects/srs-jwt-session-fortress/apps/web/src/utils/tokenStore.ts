// This variable lives entirely in RAM. It dies on refresh.
let inMemoryToken: string | null = null;

export const getToken = () => inMemoryToken;
export const setToken = (token: string | null) => {
  inMemoryToken = token;
};