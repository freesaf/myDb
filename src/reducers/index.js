import { combineReducers } from "redux";
import authReducer from "./authReducer";
import businessReducer from "./businessReducer";
import experienceReducer from "./experienceReducer";
import uploadReducer from "./uploadReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import cartReducer from "./cartReducer";

// import { reducer as formReducer } from "redux-form";
export default combineReducers({
  auth: authReducer,
  businesses: businessReducer,
  experiences: experienceReducer,
  uploads: uploadReducer,
  errors: errorReducer,
  loader: loaderReducer,
  cart: cartReducer,
});
