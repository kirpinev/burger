export const validateEmail = (email) => {
  const regexp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return regexp.test(email);
};
