
import axios from "axios";
import { CartItemDetails } from "./CartItemDetails.jsx";


export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );

          const deleteCartItem = async () => {
            await axios.delete(`api/cart-items/${cartItem.productId}`)
            await loadCart();
          }

          return (
            <CartItemDetails
              cartItem={cartItem}
              selectedDeliveryOption={selectedDeliveryOption}
              deleteCartItem={deleteCartItem}
              loadCart={loadCart}
              deliveryOptions={deliveryOptions} />
          );
        })}
    </div>
  );
}
