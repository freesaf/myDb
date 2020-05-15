import {
  UPLOAD_ERROR,
  CREATE_ERROR,
  FETCH_ERROR,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  GOOGLE_SIGNIN_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  uploadError: null,
  createError: null,
  fetchError: null,
  signInError: null,
  googleSignInErr: null,
  signUpError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_ERROR:
      return { ...state, uploadError: action.payload };
    case CREATE_ERROR:
      return { ...state, createError: action.payload };
    case FETCH_ERROR:
      return { ...state, fetchError: action.payload };
    case SIGN_IN_ERROR:
      return { ...state, signInError: action.payload };
    case SIGN_UP_ERROR:
      return { ...state, signUpError: action.payload };
    case GOOGLE_SIGNIN_ERROR:
      return { ...state, googleSignInErr: action.payload };

    default:
      return state;
  }
};
