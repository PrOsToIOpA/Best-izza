export const addPizzaToCart = (pizzaObj) => ({
   type: 'ADD_PIZZA_CART',
   payload: pizzaObj,
});

export const clearCart = () => ({
   type: 'CLEAR_CART',
});

export const removeCartItem = (_id, size,type) => 
(console.log("_id", _id),{
   type: 'REMOVE_CART_ITEM',
   payload: `${_id}+${size}+${type}`,
});

export const plusCartItem = (_id, size,type) => ({
   type: 'PLUS_CART_ITEM',
   payload: `${_id}+${size}+${type}`,
});

export const minusCartItem = (_id, size,type) => ({
   type: 'MINUS_CART_ITEM',
   payload: `${_id}+${size}+${type}`,
});