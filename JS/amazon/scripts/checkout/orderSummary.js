import {cart, removeFromCart, calculateCartCount, updateItemQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function generateHTML(){
  let cartSummaryHTML = '';

  renderPaymentSummary();
  renderCheckoutHeader();
  
  //Find if product is in the cart and add to HTML if so
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const dateString = calculateDeliveryDate(deliveryOptionId);
    
    
    cartSummaryHTML += 
    `
    <div class="header-content"></div>
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label"
              >${cartItem.quantity}</span>
            </span>
            <span 
            class="update-quantity-link link-primary js-update-link"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span 
              class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">Save</span>
            <span 
              class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem, deliveryOptionId)}
        </div>
      </div>
    </div>`;
  });


  //After looping, set HTML to order summary HTML
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  //Add action listeners for delete button
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      generateHTML();
    });
  });

  //Add action listeners for update button
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      generateHTML();
    });
  });

  //Add action listeners for save button
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      saveTriggered(link);
    });
  });

  //Add action listeners for delivery options
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      generateHTML();
    });
  });

  function saveTriggered(link){
    const productId = link.dataset.productId;
    const quantityInput = Number(document.querySelector('.js-quantity-input').value);
    let container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.remove('is-editing-quantity');
    if (!(quantityInput>=0 && quantityInput<1000)){
      return;  
    }
    
    updateItemQuantity(productId, quantityInput)
    updateCheckoutHeader();
    document.querySelector('.js-quantity-label').innerHTML = quantityInput;
  
  }

  function deliveryOptionsHTML(matchingProduct, cartItem, deliveryOptionId){
    let html = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      deliveryOptionId = getDeliveryOption(deliveryOptionId);
      
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      
      html+=
      `
      <div 
        class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : '' } class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `;

    });
    return html;
  }
}

generateHTML();











