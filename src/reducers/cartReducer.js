import {
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  paid: false,
  transaction_details: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        paid: true,
        transaction_details: action.payload,
      };
    case TRANSACTION_FAILED:
      return { ...state, paid: false, error: action.payload };
    default:
      return state;
  }
};
