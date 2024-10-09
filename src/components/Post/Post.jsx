import React, { useEffect, useState } from 'react';
import './Post.css';
import CommentIcon from '../../img/comment.png';
import ShareIcon from '../../img/share.png';
import HeartIcon from '../../img/like.png';
import NotLikedIcon from '../../img/notlike.png';
import { likePost, deletePost } from '../../api/PostsRequests'; // Import deletePost
import { useSelector, useDispatch } from 'react-redux';
import { getAllUser } from '../../api/UserRequests';
import { fetchComments, addComment } from '../../actions/commentActions';
import CommentModal from '../commentModal/CommentModal';

const Post = ({ postdata }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(postdata.likes.includes(user._id));
  const [likes, setLikes] = useState(postdata.likes.length);
  const [postername, setPostername] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { comments } = useSelector((state) => state.commentReducer);

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(postdata._id));

    if (user._id === postdata.userId) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [dispatch, postdata._id, user._id, postdata.userId]);

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const { data } = await getAllUser();
        const poster = data.find((person) => person._id === postdata.userId);
        if (poster) {
          setPostername(poster.firstname);
          setPosterImage(poster.profilePicture);
        }
      } catch (error) {
        console.error('Error fetching poster details:', error);
      }
    };
    fetchPosterDetails();
  }, [postdata.userId]);

  const handleComment = () => {
    setOpenModal(!openModal);
    dispatch(fetchComments(postdata._id));
  };

  const handleLike = () => {
    likePost(postdata._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleAddComment = (commentText) => {
    dispatch(addComment({ postId: postdata._id, userId: user._id, text: commentText }));
  };

  const handleDelete = async () => {
    try {
      await deletePost(postdata._id, user._id); // Pass post id and user id
      // Add logic to remove the deleted post from the UI if necessary
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='Post'>
      <div>
        <span>
          {posterImage && <img src={process.env.REACT_APP_PUBLIC_FOLDER + posterImage} alt={`${postername}'s Profile`} className='posterImagestyle' />}
          <p className='postpersonName'>{postername}</p>
        </span>
        {postdata.image && (
          <div>
            {postdata.image.endsWith('.mp4') ? (
              <video className='videostyle' controls>
                <source src={process.env.REACT_APP_PUBLIC_FOLDER + postdata.image} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className='imagestyle' src={process.env.REACT_APP_PUBLIC_FOLDER + postdata.image} alt='' />
            )}
          </div>
        )}
      </div>

      <div className='postReact'>
        <img src={liked ? HeartIcon : NotLikedIcon} alt='' style={{ cursor: 'pointer' }} onClick={handleLike} />
        <img src={CommentIcon} alt='' onClick={handleComment} />
        <img src={ShareIcon} alt='' />
        {showDeleteButton && (
          <button style={{ border: 'none' }} onClick={handleDelete}>
            <i className="fa-solid fa-trash fa-xl"></i>
          </button>
        )}
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
      <div className='detail'>
        <span>
          <b>{postdata.name} </b>
        </span>
        <span>{postdata.desc}</span>
      </div>
      <CommentModal open={openModal} postId={postdata._id} comments={comments} addComment={handleAddComment} />
    </div>
  );
};

export default Post;










// // Post.jsx

// import React, { useEffect, useState } from 'react';
// import './Post.css';
// import CommentIcon from '../../img/comment.png';
// import ShareIcon from '../../img/share.png';
// import HeartIcon from '../../img/like.png';
// import NotLikedIcon from '../../img/notlike.png';
// import { likePost } from '../../api/PostsRequests';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllUser } from '../../api/UserRequests';
// import { fetchComments, addComment } from '../../actions/commentActions';
// import CommentModal from '../commentModal/CommentModal';

// const Post = ({ postdata }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.authReducer.authData);
//   const [liked, setLiked] = useState(postdata.likes.includes(user._id));
//   const [likes, setLikes] = useState(postdata.likes.length);
//   const [postername, setPostername] = useState('');
//   const [posterImage, setPosterImage] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const { comments } = useSelector((state) => state.commentReducer);

//   const [showDeleteButton, setShowDeleteButton] = useState(false)

//   useEffect(() => {
//     dispatch(fetchComments(postdata._id));

//     if(user._id === postdata.userId){
//       setShowDeleteButton(true)
//       console.log("deeltebutton"+showDeleteButton);
//     }else{
//       setShowDeleteButton(false);
//       console.log("delteButton"+showDeleteButton);
//     }

//   }, [dispatch, postdata._id]);
  

//   useEffect(() => {
//     const fetchPosterDetails = async () => {
//       try {
//         const { data } = await getAllUser();
//         const poster = data.find((person) => person._id === postdata.userId);
//         if (poster) {
//           setPostername(poster.firstname);
//           setPosterImage(poster.profilePicture);
//         }
//       } catch (error) {
//         console.error('Error fetching poster details:', error);
//       }
//     };
//     fetchPosterDetails();
//   }, [postdata.userId]);

//   const handleComment = () => {
//     setOpenModal(!openModal);
//     dispatch(fetchComments(postdata._id)); // Pass postId to fetchComments
//   };
  

//   const handleLike = () => {
//     likePost(postdata._id, user._id);
//     setLiked((prev) => !prev);
//     liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
//   };

//   const handleAddComment = (commentText) => {
//     dispatch(addComment({ postId: postdata._id, userId: user._id, text: commentText }));
//   };



//   return (
//     <div className='Post'>
//       <div>
//         <span>
//           {posterImage && <img src={process.env.REACT_APP_PUBLIC_FOLDER + posterImage} alt={`${postername}'s Profile`} className='posterImagestyle' />}
//           <p className='postpersonName'>{postername}</p>
//         </span>
//         {postdata.image && (
//           <div>
//             {postdata.image.endsWith('.mp4') ? (
//               <video className='videostyle' controls>
//                 <source src={process.env.REACT_APP_PUBLIC_FOLDER + postdata.image} type='video/mp4' />
//                 Your browser does not support the video tag.
//               </video>
//             ) : (
//               <img className='imagestyle' src={process.env.REACT_APP_PUBLIC_FOLDER + postdata.image} alt='' />
//             )}
//           </div>
//         )}
//       </div>

//       <div className='postReact'>
//         <img src={liked ? HeartIcon : NotLikedIcon} alt='' style={{ cursor: 'pointer' }} onClick={handleLike} />
//         <img src={CommentIcon} alt='' onClick={handleComment} />
//         <img src={ShareIcon} alt='' />
//        {showDeleteButton && <button style={{border:'none'}}> <i class="fa-solid fa-trash fa-xl"></i> </button>}
//       </div>

//       <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
//       <div className='detail'>
//         <span>
//           <b>{postdata.name} </b>
//         </span>
//         <span>{postdata.desc}</span>
//       </div>
//       <CommentModal open={openModal} postId={postdata._id} comments={comments} addComment={handleAddComment} />
     
//     </div>
//   );
// };

// export default Post;




