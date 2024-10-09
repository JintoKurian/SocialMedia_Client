// 4. commentReducer.js
import * as types from '../actions/ActionTypes';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS_REQUEST:
    case types.ADD_COMMENT_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload, loading: false, error: null };
    case types.ADD_COMMENT_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload], loading: false, error: null };
    case types.FETCH_COMMENTS_FAILURE:
    case types.ADD_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Define cases for updating, deleting comments, etc.
    default:
      return state;
  }
};

export default commentReducer;
