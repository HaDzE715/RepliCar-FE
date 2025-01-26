import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.findIndex(
        (item) =>
          item._id === action.item._id &&
          item.selectedVariant?.name === action.item.selectedVariant?.name // Match by variant
      );

      if (existingItemIndex >= 0) {
        // If the same product with the same variant exists, increase its quantity
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Add new product with the selected variant
        return [
          ...state,
          {
            ...action.item,
            quantity: 1,
            selectedVariant: action.item.selectedVariant,
          },
        ];
      }
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.id);

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case "SET_CART":
      // Replace the current state with the provided cart
      return action.cart;
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    console.log("Updated cart state:", cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
