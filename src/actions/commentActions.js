// 2. commentActions.js
import * as types from './ActionTypes';
import * as api from '../api/commentApi'; // Import your API functions

export const fetchComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_COMMENTS_REQUEST });
    const comments = await api.getComments(postId); // Pass postId to API function
    dispatch({ type: types.FETCH_COMMENTS_SUCCESS, payload: comments });
  } catch (error) {
    dispatch({ type: types.FETCH_COMMENTS_FAILURE, payload: error.message });
  }
};





// import axios from 'axios';

// export const fetchComments = (postId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/comments/${postId}`);
//     dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'FETCH_COMMENTS_FAILURE', payload: error.message });
//   }
// };




export const addComment = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_COMMENT_REQUEST });
    const newComment = await api.addComment(commentData); // Call your API function to add a comment
    dispatch({ type: types.ADD_COMMENT_SUCCESS, payload: newComment });
  } catch (error) {
    dispatch({ type: types.ADD_COMMENT_FAILURE, payload: error.message });
  }
};

// Define other action creators for updating, deleting comments, etc.
