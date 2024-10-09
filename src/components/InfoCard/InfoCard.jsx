import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import { getAllUser } from "../../api/UserRequests";



const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  //follower details setting
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

  

  const handleLogOut = ()=> {
    dispatch(logout())
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {followerPage && follower ?
       <>
       <div className="info">
          {/* */}
          <span>
            <b>Status </b>
          </span>
          <span>{follower.relationship}</span>
        </div>
        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{follower.livesIn}</span>
        </div>
        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span>{follower.worksAt}</span>
        </div>
       
       </>:
        <>
        <div className="info">
           {/* */}
           <span>
             <b>Status </b>
           </span>
           <span>{profileUser.relationship}</span>
         </div>
         <div className="info">
           <span>
             <b>Lives in </b>
           </span>
           <span>{profileUser.livesIn}</span>
         </div>
         <div className="info">
           <span>
             <b>Works at </b>
           </span>
           <span>{profileUser.worksAt}</span>
         </div>
        
        </>}
    

      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default InfoCard;


// import React, { useEffect, useState } from "react";
// import "./InfoCard.css";
// import { UilPen } from "@iconscout/react-unicons";
// import ProfileModal from "../ProfileModal/ProfileModal";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import * as UserApi from "../../api/UserRequests.js";
// import { logout } from "../../actions/AuthActions";



// const InfoCard = () => {
//   const dispatch = useDispatch()
//   const params = useParams();
//   const [modalOpened, setModalOpened] = useState(false);
//   const profileUserId = params.id;
//   const [profileUser, setProfileUser] = useState({});
//   const { user } = useSelector((state) => state.authReducer.authData);

  

//   const handleLogOut = ()=> {
//     dispatch(logout())
//   }


//   useEffect(() => {
//     const fetchProfileUser = async () => {
//       if (profileUserId === user._id) {
//         setProfileUser(user);
//       } else {
//         console.log("fetching")
//         const profileUser = await UserApi.getUser(profileUserId);
//         setProfileUser(profileUser);
//         console.log(profileUser)
//       }
//     };
//     fetchProfileUser();
//   }, [user]);

//   return (
//     <div className="InfoCard">
//       <div className="infoHead">
//         <h4>Profile Info</h4>
//         {user._id === profileUserId ? (
//           <div>
//             <UilPen
//               width="2rem"
//               height="1.2rem"
//               onClick={() => setModalOpened(true)}
//             />
//             <ProfileModal
//               modalOpened={modalOpened}
//               setModalOpened={setModalOpened}
//               data = {user}
//             />
//           </div>
//         ) : (
//           ""
//         )}
//       </div>

//       <div className="info">
//         {/* */}
//         <span>
//           <b>Status </b>
//         </span>
//         <span>{profileUser.relationship}</span>
//       </div>
//       <div className="info">
//         <span>
//           <b>Lives in </b>
//         </span>
//         <span>{profileUser.livesIn}</span>
//       </div>
//       <div className="info">
//         <span>
//           <b>Works at </b>
//         </span>
//         <span>{profileUser.worksAt}</span>
//       </div>

//       <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
//     </div>
//   );
// };

// export default InfoCard;
