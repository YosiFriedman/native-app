import { ADD_TO_CART, REMOVER_FROM_CART, CLEAR_CART, REDUCE_FROM_CART,ADD_FROM_CART } from "../constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVER_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
 
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};
export default cartItems;
