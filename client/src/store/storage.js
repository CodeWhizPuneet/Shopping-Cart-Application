const CART_STORAGE_KEY = "redux-shopping-cart";

export const loadCartState = () => {
  try {
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (!serialized) {
      return { items: [] };
    }

    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed.items)) {
      return { items: [] };
    }

    return parsed;
  } catch {
    return { items: [] };
  }
};

export const saveCartState = (state) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore write errors in private mode or storage restrictions.
  }
};
