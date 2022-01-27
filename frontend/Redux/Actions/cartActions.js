import { ADD_TO_CART, REMOVER_FROM_CART, CLEAR_CART,ADD_QUANTITY } from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
   
  };
};

export const AddQuantity = (payload) => {
  return {
    type: ADD_QUANTITY,
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
