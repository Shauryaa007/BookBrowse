import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { useFirebase } from "../context/Firebase";

import Button from 'react-bootstrap/Button';


import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
}
from 'mdb-react-ui-kit';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


export const RegisterPage=()=>{

    const firebase=useFirebase();
    const navigate=useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");    
    const [password,setPassword]=useState("");    
    const [password1,setPassword1]=useState("");    

    const submitHandler=async(e)=>{
        e.preventDefault(); // dont refresh page on submit

        if(password===password1)
        {
          console.log("signingup......")

        const result= await firebase.signUpUserWithEmialAndPass(email,password);

        console.log("successfully registered",result);
        }
        else
        {
          setMatch("Password did not match !!")
        }

        
    }

    useEffect(()=>{
        if(firebase.is_loggedIn)
        {
            //navigate to home
            navigate('/');
        }
    },[firebase,navigate])

    const [match,setMatch]=useState("");

    const handlePass=(e)=>{
      setPassword1(e.target.value)
    }




    return (
        <MDBContainer fluid>

      <MDBCard className='text-black m-' style={{borderRadius: '100px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <input required value={name} onChange={e=>setName(e.target.value)} placeholder='Your Name'  type='text' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder='Your Email'  type='email' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'  type='password' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center ">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <input required value={password1} onChange={(e)=>handlePass(e)} placeholder='Password'  type='password' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>
              <p style={{color:'red'}}  className="mb-4">{match}</p>

              

              <Button onClick={submitHandler} className='mb-4' size='lg'>Register</Button>
              <Button onClick={()=>firebase.signUpWithGoogle()} className='mb-4' variant='danger' color='red' size='lg'>Signup with Google</Button>
    
                <p >already have an account? <a href="/login">Login</a></p>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>
            

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    );
}
