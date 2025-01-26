import React from "react";
import { Button } from "@mui/material";
import { useCart } from "../Components/CartContext";
import "../Style/CartItem.css";

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", id: item.id });
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Size: {item.size}</p>
        <p>Price: {item.price}₪</p>
        {item.discount && <p>Discounted Price: {item.discount_price}₪</p>}
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
