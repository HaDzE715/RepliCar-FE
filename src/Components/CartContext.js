import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.findIndex(
        (item) => item._id === action.item._id
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase its quantity by 1
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        return [...state, { ...action.item, quantity: 1 }];
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

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
