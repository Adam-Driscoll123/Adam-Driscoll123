function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems){
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: '1'
        }];
      } 
    },

    saveToStorage(){ localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); },

    addToCart(productId, quantity = 1){
      let matchingItem;
        //Check if item is already in cart
        this.cartItems.forEach((item) => {
          if (productId === item.productId){ matchingItem = item; }
        });

        //If item is in cart, increase quantity, else add to cart
        if (matchingItem){ matchingItem.quantity+= quantity; }
        else { 
          this.cartItems.push({productId: productId, quantity: quantity, deliveryOptionId: '1'}); 
        }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(product => product.productId != productId);
      this.saveToStorage();
      
    },

    calculateCartCount(){
      let cartQuantity = 0;
      this.cartItems.forEach(item => cartQuantity+=Number(item.quantity));
      this.saveToStorage();
      return cartQuantity;
    },

    updateItemQuantity(productId, newQuantity){
      this.cartItems.forEach((item) =>{
        if (item.productId === productId) {  
          item.quantity  = newQuantity;
          this.saveToStorage();
        }
      });
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
        //Check if item is already in cart
        this.cartItems.forEach((item) => {
          if (productId === item.productId){ matchingItem = item; }
        });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }



  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

businessCart.loadFromStorage();
cart.loadFromStorage();

console.log(businessCart);
console.log(cart);






