export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '2'
  }]
}
  



function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  
}

export function addToCart(productId, quantity){
  let matchingItem;
    //Check if item is already in cart
    cart.forEach((item) => {
      if (productId === item.productId){ matchingItem = item; }
    });

    //If item is in cart, increase quantity, else add to cart
    if (matchingItem){ matchingItem.quantity+= quantity; }
    else { 
      cart.push({
         productId: productId,
         quantity: 1,
         deliveryOptionId: '1'
        }); 
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

