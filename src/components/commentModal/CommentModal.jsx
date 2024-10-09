// CommentModal.jsx

import React, { useState, useEffect } from 'react';
import './CommentModal.css';
import { useSelector } from 'react-redux';
import { getUserById } from '../../api/UserRequests'; // Assuming you have an API function to fetch user data

function CommentModal({ open, postId, comments, addComment }) {
  const [newComment, setNewComment] = useState('');
  const [commentUsers, setCommentUsers] = useState({}); // State to store user data for each comment
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    // Function to fetch user data based on userId
    const fetchCommentUsers = async () => {
      const userIds = [...new Set(comments.map(comment => comment.userId))];
      const fetchedUsers = {};

      for (const userId of userIds) {
        try {
          const userData = await getUserById(userId); // Assuming this function fetches user data based on userId
          fetchedUsers[userId] = userData; // Store user data in fetchedUsers object
        } catch (error) {
          console.error(`Error fetching user data for userId ${userId}:`, error);
        }
      }

      setCommentUsers(fetchedUsers); // Update commentUsers state with fetched user data
    };

    fetchCommentUsers();
  }, [comments]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      addComment(newComment);
      setNewComment('');
    }
  };

  if (!open) return null;

  // Filter comments specific to the post
  const postComments = comments.filter(comment => comment.postId === postId);

  return (
    <div className='overlay'>
      <div className='modalContainer'>
        <div className='commentsContainer'>
          {postComments.map((comment, index) => (
            <div key={index} className='commentItem'>
              <div className='commentUserInfo'>
                <img src={commentUsers[comment.userId]?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + commentUsers[comment.userId]?.profilePicture :process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt='Profile' className='commentUserImage' />
                <span className='commentUserName'><p style={{fontWeight:'bold'}}>{commentUsers[comment.userId]?.firstname}</p></span>
              </div>
              <p className='commentText'>{comment.text}</p>
            </div>
          ))}
        </div>
        <div className='commentInputContainer'>
          <span>
            <input type='text' value={newComment} onChange={handleInputChange} placeholder='Add your comment' className='commentInput' />
            <button className='addcommentButton commentButton button' onClick={handleAddComment}>Add</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;



// // CommentModal.jsx

// import React, { useState } from 'react';
// import './CommentModal.css';

// function CommentModal({ open, postId, comments, addComment }) {
//   const [newComment, setNewComment] = useState('');

//   const handleInputChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() !== '') {
//       addComment(newComment);
//       setNewComment('');
//     }
//   };

//   if (!open) return null;

//   // Filter comments specific to the post
//   const postComments = comments.filter(comment => comment.postId === postId);

//   return (
//     <div className='overlay'>
//       <div className='modalContainer'>
//         <div className='commentsContainer'>
//           {postComments.map((comment, index) => (
//             <p key={index}>{comment.text}</p>
//           ))}
//         </div>
//         <div className='commentInputContainer'>
//           <span>
//           <input className='commentInput' type='text' value={newComment} onChange={handleInputChange} placeholder='Add your comment' />
//           <button className='commentButton button ps-button' onClick={handleAddComment}>Add</button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommentModal;






// import React, { useState } from 'react';
// import './CommentModal.css';

// function CommentModal({ open, comments, addComment }) {
//   const [newComment, setNewComment] = useState('');

//   const handleInputChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() !== '') {
//       addComment(newComment);
//       setNewComment('');
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className='overlay'>
//       <div className='modalContainer'>
//         <div className='commentsContainer'>
//           {comments.map((comment, index) => (
//             <p key={index}>{comment.text}</p>
//           ))}
//         </div>
//         <div className='commentInputContainer'>
//           <input type='text' value={newComment} onChange={handleInputChange} placeholder='Add your comment' />
//           <button onClick={handleAddComment}>Add</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommentModal;



// import React from 'react'
// import './CommentModal.css'


// function CommentModal({open}) {

//     if(!open) return null

//   return (
//     <div className='overlay'>
//         <div className="modalContainer">
//             <input className='commentinput' type="text" placeholder='Add your comment' /> <button>Add comment</button>

//             <p>Sample comment1</p>
//             <p>Sample comment2</p>
//             <p>Sample comment3</p>
//             <p>Sample comment4</p>
//             <p>Sample comment5</p>
//         </div>
//     </div>
//   )
// }

// export default CommentModal