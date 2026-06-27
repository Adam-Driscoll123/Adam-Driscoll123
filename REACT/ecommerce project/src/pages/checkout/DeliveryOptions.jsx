import axios from "axios";
import { formatMoney } from "../../utils/utils.js";
import dayjs from 'dayjs';

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        let estimatedDeliveryTime = deliveryOption.estimatedDeliveryTimeMs;

        let priceString =
          deliveryOption.priceCents === 0
            ? "FREE Shipping"
            : `${formatMoney(deliveryOption.priceCents)}`;

        const updateDeliveryOption = async () => {
          await axios.put(
            `/api/cart-items/${cartItem.productId}`,
            {
              deliveryOptionId: deliveryOption.id
            }
           )
           await loadCart();
        }

        return (
          <div 
            key={deliveryOption.id} 
            className="delivery-option"
            onClick={updateDeliveryOption}>
            <input
              type="radio"
              onChange={() => {}}
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(estimatedDeliveryTime).format("dddd, MMMM D")}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
