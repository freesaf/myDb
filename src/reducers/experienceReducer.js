import {
  CATEGORY_SELECTED,
  FETCH_SELECTED_BIZ_EXPERIENCES,
  FETCH_USER_EXPERIENCES,
  FETCH_PUBLISHED_EXPERIENCES,
  FETCH_PARTNERS_EXPERIENCES,
  FETCH_EXPERIENCE,
  CREATE_EXPERIENCE,
  FETCH_BUSINESS_PARTNERS_EXPERIENCES,
} from "../actions/types";
const INITIAL_STATE = {
  selectedExperience: null,
  selectedCategory: null,
  userExperiences: null,
  publishedExperiences: null,
  partnersExperiences: null,
  selectedBizExpriences: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EXPERIENCE:
      return { ...state, selectedExperience: action.payload };
    case FETCH_SELECTED_BIZ_EXPERIENCES:
      return { ...state, selectedBizExpriences: action.payload };
    case CATEGORY_SELECTED:
      return { ...state, selectedCategory: action.payload };
    case FETCH_USER_EXPERIENCES:
      return { ...state, userExperiences: action.payload };
    case CREATE_EXPERIENCE:
      return { ...state };
    case FETCH_PUBLISHED_EXPERIENCES:
      return { ...state, publishedExperiences: action.payload };
    case FETCH_PARTNERS_EXPERIENCES:
      return { ...state, partnersExperiences: action.payload };
    case FETCH_BUSINESS_PARTNERS_EXPERIENCES:
      return { ...state, businessPartExperiences: action.payload };
    default:
      return state;
  }
};
