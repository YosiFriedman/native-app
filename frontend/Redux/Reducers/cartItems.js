import { ADD_TO_CART, REMOVER_FROM_CART, CLEAR_CART, REDUCE_FROM_CART,ADD_FROM_CART } from "../constants";


const cartItems = (state =[], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let doesItemExist = false;
      const newState = state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
          doesItemExist = true;
        }
        return item;
      });
      if (doesItemExist) {
        return newState;
      }
      return [...state, action.payload];
      // return [...state, action.payload];
      
    case REMOVER_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
 
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};
export default cartItems;
