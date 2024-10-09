import React from 'react'
import './AdminPanel.css'
import AdminSideBar from './AdminSideBar'
import AdminHome from './AdminHome'

function AdminPanel() {
  return (
    <div className='panel'>
        <AdminSideBar/>
        <AdminHome/>
    </div>
  )
}

export default AdminPanel