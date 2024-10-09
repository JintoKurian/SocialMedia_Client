import React, { useState } from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";


const NavIcons = () => {

  const { user } = useSelector((state) => state.authReducer.authData);

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <UilSetting onClick={handleShow} style={{cursor:'pointer'}} />
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>

      <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
       <Modal show={show} onHide={handleClose} style={{borderRadius:'10px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Link to="/admin" style={{textDecoration: 'none'}}>
        {user.isAdmin &&
          <p style={{color:'black', fontWeight:'bold'}}>Open Admin Panel</p>}
      </Link>
        </Modal.Body>
      </Modal> 
    </>     

    </div>
  );
};

export default NavIcons;
