import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllUser } from "../../api/UserRequests";
import Modal from 'react-bootstrap/Modal';


const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [persons, setPersons] = useState([]);
  const [followerPage,setFollowerPage] = useState(false)
  const [follower, setFollower] = useState([]);


  let { id } = useParams();

useEffect(()=>{
  if(user._id!==id){
    console.log('This is not user profile page')
    setFollowerPage(true)
  }else{
    console.log('This is user profile page');
  }
},[])

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    // Find the person with the matching id
    const person = persons.find(person => person._id === id);
    // Do something with the person
    setFollower(person);
  }, [persons, id]);

  // console.log(persons)
  // console.log(follower);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sortedFollowers, setSortedFollowers] = useState([]);

  const [modalHeading, setModalHeading] = useState("");
  

  const showFollowers = (followersId,modalheading) => {
    const sorted = persons.filter(user => followersId.includes(user._id));
    setSortedFollowers(sorted);
    setModalHeading(modalheading);
    handleShow()
  };

  return (
    <div className="ProfileCard">
      {followerPage && follower ?
      <div className="ProfileImages">
      <img src={
          follower.coverPicture
            ? serverPublic + follower.coverPicture
            : serverPublic + "default-cover.jpg"
        } alt="CoverImage" />
      <img
        src={
          follower.profilePicture
            ? serverPublic + follower.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="ProfileImage"
      />
    </div> :
    <div className="ProfileImages">
    <img src={
        user.coverPicture
          ? serverPublic + user.coverPicture
          : serverPublic + "default-cover.jpg"
      } alt="CoverImage" />
    <img
      src={
        user.profilePicture
          ? serverPublic + user.profilePicture
          : serverPublic + "defaultProfile.png"
      }
      alt="ProfileImage"
    />
  </div>
      }
      
      
      {followerPage && follower ?
        <div className="ProfileName">
          <span>{follower.firstname} {follower.lastname}</span>
          <span>{follower.worksAt ? follower.worksAt : 'Write about yourself'}</span>
        </div>
        :
        <div className="ProfileName">
          <span>{user.firstname} {user.lastname}</span>
          <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
        </div>}
      

      <div className="followStatus">
        <hr />
        {followerPage && follower ?
          <div>
            <div className="follow">
              <span  style={{cursor:"pointer"}} onClick={()=>showFollowers(follower.followers)}>{follower.followers.length}</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span style={{cursor:"pointer"}} onClick={()=>showFollowers(follower.following)}>{follower.following.length}</span>
              <span>Following</span>
            </div>
            {/* for profilepage */}
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{
                    posts.filter((post) => post.userId === follower._id).length
                  }</span>
                  <span>Posts</span>
                </div>{" "}
              </>
            )}
          </div> :

          <div>
            <div className="follow">
              <span style={{cursor:"pointer"}} onClick={()=>showFollowers(user.followers,"Followers")}>{user.followers.length}</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span  style={{cursor:"pointer"}} onClick={()=>showFollowers(user.following, "Following")}>{user.following.length}</span>
              <span>Following</span>
            </div>
            {/* for profilepage */}
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{
                    posts.filter((post) => post.userId === user._id).length
                  }</span>
                  <span>Posts</span>
                </div>{" "}
              </>
            )}
          </div>
        }

        {/* Modal must start here */}
        <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
       <Modal show={show} onHide={handleClose} style={{borderRadius:'10px'}}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {sortedFollowers.map(follower => (
          <div className="followerModal" key={follower._id}>
            <div>
              <img src={follower.profilePicture? serverPublic + follower.profilePicture : serverPublic + "defaultProfile.png"} alt="profImg" className="followerModalImage" />
            <div className="Modalname">
              <span>{follower.firstname} {follower.lastname}</span>
              <span>@{follower.username}</span>
            </div>
            </div>
          </div>
        ))}
        </Modal.Body>
      </Modal> 
    </>     


        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;