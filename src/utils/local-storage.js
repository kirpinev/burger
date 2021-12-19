export const getTokenFromStorage = (name) => localStorage.getItem(name);

export const saveTokenToStorage = (name, value) =>
  localStorage.setItem(name, value);

export const resetStorage = () => localStorage.clear();
