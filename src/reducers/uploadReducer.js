import {
  UPLOAD_PROGRESS,
  GET_DOWNLOAD_URL,
  UPLOAD_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  uploadProgress: 0,
  error: null,
  downloadURL: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return { ...state, uploadProgress: action.payload };
    case UPLOAD_ERROR:
      return { ...state, error: action.payload };
    case GET_DOWNLOAD_URL:
      return { ...state, downloadURL: action.payload };

    default:
      return state;
  }
};
