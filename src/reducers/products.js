import { ADD_PRODUCT, FETCH_PRODUCTS } from "../actions/types";
const INITIAL_STATE = {
  availableProducts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state };
    case FETCH_PRODUCTS:
      return { ...state, availableProducts: action.payload };

    default:
      return state;
  }
};
