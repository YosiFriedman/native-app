import { ADD_TO_CART, REMOVER_FROM_CART, CLEAR_CART,ADD_FROM_CART,REDUCE_FROM_CART } from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVER_FROM_CART,
    payload,
  };
};



export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
