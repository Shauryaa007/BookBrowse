import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';




export const NavigationBar=()=>{
  const firebase=useFirebase();
  const navigate=useNavigate();


  const [status,setStatus]=useState("Login/SignUp");

  const LogOut=()=>{
    firebase.signOut(firebase.firebaseAuth);
    setStatus("Login/SignUp");
    navigate('/register');
  }

  useEffect(()=>{
    if(firebase.user){setStatus("LogOut")}
},[firebase]);
  
    return(
       <Navbar bg="dark" expand="lg" variant="dark" className="mb-4" >
      <Navbar.Brand href="/">BookBrowse</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{if(firebase.is_loggedIn){navigate('/book/list')} else{alert("Please Login First")} }}>ListBooks</Nav.Link>
          <Nav.Link onClick={()=>{if(firebase.is_loggedIn){navigate('/book/orders')} else{alert("Please Login First")} }}>MyBooks</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Button onClick={LogOut}  variant="outline-light">{status}</Button>
      </Nav>
    </Navbar>

    );
}