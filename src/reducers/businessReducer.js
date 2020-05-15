import {
  FETCH_SELECTED_BUSINESS,
  FETCH_BUSINESSES,
  SEARCH_BUSINESS_OWNER,
  CATEGORY_SELECTED,
  COMPLETE_USER_DATA,
  FETCH_CURRENT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  selectedBusiness: null,
  businessesList: null,
  searchedBusiness: null,
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SELECTED_BUSINESS:
      return { ...state, selectedBusiness: action.payload };
    case FETCH_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case COMPLETE_USER_DATA:
      return { ...state, selectedBusiness: action.payload };
    case FETCH_BUSINESSES:
      return { ...state, businessesList: action.payload };
    case SEARCH_BUSINESS_OWNER:
      return { ...state, searchedBusiness: action.payload };
    case CATEGORY_SELECTED:
      return { ...state, selectedCategory: action.payload };
    // case CREATE_BUSINESS:
    //   return { ...state, [action.payload.id]: action.payload };
    // case FETCH_BUSINESSES:
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    // case EDIT_BUSINESS:
    //   return { ...state, [action.payload.id]: action.payload };
    // case DELETE_BUSINESS:
    //   return _.omit(state, action.payload);
    default:
      return state;
  }
};
