import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";
const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);
  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div key={item.id} className="search-result-item">
          <div className="image-container">
            <img src={item.img} alt="" />
          </div>
          <div className="prod-details">
            <span className="name">{item.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                +
              </span>
            </div>
            <div className="text">
              <span>{item.quantity}</span>
              <span>x</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
