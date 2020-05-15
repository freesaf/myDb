import { SET_LOADER } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case SET_LOADER:
      return action.payload;

    default:
      return state;
  }
};
