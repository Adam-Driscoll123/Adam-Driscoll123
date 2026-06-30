import dayjs from "dayjs";
import { formatMoney } from "../../utils/utils.js";
import { DeliveryOptions } from "./DeliveryOptions.jsx";
import { useState } from "react";
import './CartItemDetails.css'
import axios from "axios";

export function CartItemDetails({ cartItem, selectedDeliveryOption, deleteCartItem, loadCart, deliveryOptions }) {
  const [editingQuantity, setEditingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const updateQuantity = async () => {
    if (editingQuantity) {
      setEditingQuantity(false);

      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      })
      await loadCart();
      
    }
    else { setEditingQuantity(true); }
    
  }

  return (
    <div key={cartItem.productId} className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D",
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <input 
                type="text" className="quantity-input"
                style={{display: editingQuantity ? 'inline-block' : 'none'}}
                value={quantity}
                onChange={((event) => {
                  setQuantity(event.target.value);
                })}
                onKeyDown={((event) => {
                  if (event.key==='Enter'){ updateQuantity(); }
                  else if (event.key==='Escape') { 
                    setQuantity(cartItem.quantity) 
                    setEditingQuantity(false);
                  }
                })}/>
              <span 
                className="quantity-label"
                style={{display: editingQuantity ? 'none' : 'inline-block'}}
                >
                {cartItem.quantity}
              </span>
            </span>
            <span 
              className="update-quantity-link link-primary"
              onClick={updateQuantity}>Update</span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>
        <DeliveryOptions
          deliveryOptions={deliveryOptions}
          cartItem={cartItem}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
