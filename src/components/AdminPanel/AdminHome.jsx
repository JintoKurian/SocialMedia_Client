import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import { useSelector } from 'react-redux';
import { getAllUser, deleteUser } from '../../api/UserRequests';
import { getAllPosts } from '../../api/PostsRequests';

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUser();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getAllPosts();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, currentUser.user._id, currentUser.user.isAdmin);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const usershow = useSelector((state) => state.adminReducer.usersShow);
  console.log(usershow);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      ></link>
      <div className='adminHome'>
        <h1>Welcome Admin</h1>
        <div className="outside">
          {usershow ? (
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username/Email</th>
                  <th scope="col">Followers</th>
                  <th scope="col">Following</th>
                  <th scope="col">Manage User</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.followers.length}</td>
                    <td>{user.following.length}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="insidediv totalUsers">
                <h2>Total Users</h2>
                <p>{users?.length} Users</p>
                <img src="https://www.pngmart.com/files/7/Graph-Transparent-Background.png" style={{ width: '250px', marginLeft:'5px', marginTop:'-20px' }} alt="" />
              </div>
              <div className="insidediv totalPosts">
                <h2>Total Posts</h2>
                <p>{posts?.length} posts</p>
                <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" style={{ width: '160px', marginLeft: '75px', marginTop:'-18px' }} alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminHome;









// import React, { useEffect, useState } from 'react';
// import './AdminHome.css';
// import { useSelector } from 'react-redux';
// import { getAllUser } from '../../api/UserRequests';
// import { getAllPosts } from '../../api/PostsRequests';

// function AdminHome() {
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await getAllUser();
//         setUsers(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching users', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await getAllPosts();
//         setPosts(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching posts', error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const usershow = useSelector((state) => state.adminReducer.usersShow);
//   console.log(usershow);

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
//         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//         crossOrigin="anonymous"
//       ></link>
//       <div className='adminHome'>
//         <h1>Welcome Admin</h1>
//         <div className="outside">
//           {usershow ? (
//             <table className="table">
//               <thead className="thead-dark">
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Username/Email</th>
//                   <th scope="col">Followers</th>
//                   <th scope="col">Following</th>
//                   <th scope="col">Manage User</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={user._id}>
//                     <th scope="row">{index + 1}</th>
//                     <td>{user.firstname} {user.lastname}</td>
//                     <td>{user.username}</td>
//                     <td>{user.followers.length}</td>
//                     <td>{user.following.length}</td>
//                     <td><button type="button" className="btn btn-danger">Delete User</button></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <>
//               <div className="insidediv totalUsers">
//                 <h2>Total Users</h2>
//                 <p>{users?.length} Users</p>
//                 <img src="https://www.pngmart.com/files/7/Graph-Transparent-Background.png" style={{ width: '250px' }} alt="" />
//               </div>
//               <div className="insidediv totalPosts">
//                 <h2>Total Posts</h2>
//                 <p>{posts?.length} posts</p>
//                 <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" style={{ width: '160px', marginLeft: '75px' }} alt="" />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminHome;
