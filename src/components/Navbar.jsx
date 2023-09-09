import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

import "./Navbar.css"



export const NavigationBar=()=>{
  const firebase=useFirebase();
  const navigate=useNavigate();


  const [status,setStatus]=useState("Login/SignUp");

  const LogOut=()=>{
    firebase.signOut(firebase.firebaseAuth)
    setStatus("Login/SignUp")
    navigate('/register')
  }

  useEffect(()=>{
    if(firebase.user){setStatus("LogOut")}
},[firebase]);
  
    return(
        <div className="navii">
  
      <Navbar className="hello bg-dark  justify-content-between">
      <Form >
        <InputGroup  className="mx-5 text-light">
        <Navbar.Brand className="text-light" href="#home">BookBrowse</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} className="text-light" >Home</Nav.Link>
            <Nav.Link onClick={()=>{if(firebase.is_loggedIn){navigate('/book/list')}}} className="text-light" >ListBooks</Nav.Link>
            <Nav.Link onClick={()=>{if(firebase.is_loggedIn){navigate('/book/orders')}}} className="text-light" >MyBooks</Nav.Link>
          </Nav>
        </InputGroup>
      </Form>
      <Form>
        <Row>
          <Col xs="auto" className="mx-5">
          <Button onClick={LogOut} variant="success">{status}</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
        </div>
    );
}