export const cart = [];

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