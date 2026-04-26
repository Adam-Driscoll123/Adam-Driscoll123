export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2

  },

  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  },

];

export function addToCart(productId, quantity){
  let matchingItem;
    //Check if item is already in cart
    cart.forEach((item) => {
      if (productId === item.productId){ matchingItem = item; }
    });

    //If item is in cart, increase quantity, else add to cart
    if (matchingItem){ matchingItem.quantity+= quantity; }
    else { cart.push( { productId, quantity } ); }
}

export function removeFromCart(productId) {
  cart = cart.filter(product => product.productId != productId);
  console.log('filtered');
  return cart;
}