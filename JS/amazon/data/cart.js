export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }];
  } 
}
  
function saveToStorage(){ localStorage.setItem('cart', JSON.stringify(cart)); }

export function addToCart(productId, quantity = 1){
  let matchingItem;
    //Check if item is already in cart
    cart.forEach((item) => {
      if (productId === item.productId){ matchingItem = item; }
    });

    //If item is in cart, increase quantity, else add to cart
    if (matchingItem){ matchingItem.quantity+= quantity; }
    else { 
      cart.push({productId: productId, quantity: quantity, deliveryOptionId: '1'}); 
    }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter(product => product.productId != productId);
  saveToStorage();
  
}

export function calculateCartCount(){
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity+=Number(item.quantity));
  saveToStorage();
  return cartQuantity;
}

export function updateItemQuantity(productId, newQuantity){
  cart.forEach((item) =>{
    if (item.productId === productId) {  
      item.quantity  = newQuantity;
      saveToStorage();
    }
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
    //Check if item is already in cart
    cart.forEach((item) => {
      if (productId === item.productId){ matchingItem = item; }
    });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
  
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

