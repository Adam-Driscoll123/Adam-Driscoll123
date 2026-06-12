class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || '';

      if (!this.cartItems){
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: '1'
        }];
      } 
  }

  saveToStorage(){ 
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = 1){
    //Check if item is already in cart
    let matchingItem = this.findMatchingItem(productId);
    
    //If item is in cart, increase quantity, else add to cart
    if (matchingItem){ matchingItem.quantity+= quantity; }
    else { 
      this.cartItems.push({productId: productId, quantity: quantity, deliveryOptionId: '1'}); 
    }

    this.saveToStorage();
  }

  findMatchingItem(productId){
    this.cartItems.forEach((item) => {
        if (productId === item.productId){ matchingItem = item; }
      });

    return matchingItem;

  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(product => product.productId != productId);
    this.saveToStorage();
      
  }

  calculateCartCount(){
    let cartQuantity = 0;
    this.cartItems.forEach(item => cartQuantity+=Number(item.quantity));
    this.saveToStorage();
    return cartQuantity;
  }

  updateItemQuantity(productId, newQuantity){
    this.cartItems.forEach((item) =>{
      if (item.productId === productId) {  
        item.quantity  = newQuantity;
        this.saveToStorage();
      }
    });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
      //Check if item is already in cart
      this.cartItems.forEach((item) => {
        if (productId === item.productId){ matchingItem = item; }
      });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  getProductId(){
    return this.productId;
  }
  getQuantity(){
    return this.quantity;
  }
  getDeliveryOptionId(productId){
    let matchingItem = this.findMatchingItem(productId);
    if (matchingItem){ return matchingItem.deliveryOptionId }
  }
  getCartItems(){
    return this.cartItems;
  }
  
};


export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');









