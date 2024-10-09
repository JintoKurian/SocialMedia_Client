import React from 'react'
import './AdminSideBar.css'
import { useDispatch } from 'react-redux'
// import adminReducer from '../../reducers/AdminReducer';

function AdminSideBar() {
  const dispatch = useDispatch();

  const letmetry = ()=>{
    dispatch({ type: 'USERS_SELECTED' });
  }
  return (
    <div className='sidebar'>
      <h2><i class="fa-solid fa-bars"></i> Menu</h2>

      <ul type='none'>
        <li onClick={()=>{ dispatch({type: 'DASHBOARD_SELECTED'})}}> <i class="fa-solid fa-house"></i> DashBoard</li>
        <li onClick={letmetry}><i class="fa-solid fa-user" style={{color: "#ffffff"}}></i> Users</li>
        <li onClick={()=>{ dispatch({type: 'POSTS_SELECTED'})}}><i class="fa-solid fa-camera"></i> Posts</li>
        {/* <li><i class="fa-solid fa-trash"></i> Delete Post</li>
        <li><i class="fa-solid fa-trash"></i> Delete User</li> */}
      </ul>
    </div>
  )
}

export default AdminSideBar