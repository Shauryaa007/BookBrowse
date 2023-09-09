import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';

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


export const LoginPage=()=>{

    const firebase=useFirebase();
    const navigate=useNavigate();

    const [email,setEmail]=useState("");    
    const [password,setPassword]=useState("");     

    const submitHandler=async(e)=>{
        e.preventDefault(); // dont refresh page on submit

        console.log("LoginUp......");

        const result = await firebase.logInUserWithEmialAndPass(email,password);

        console.log("successfully loggedIn",result);
    }

    useEffect(()=>{
        if(firebase.is_loggedIn)
        {
            navigate('/');
        }
    },[firebase,navigate])



    return (
        <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '100px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

              

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <input  value={email} onChange={e=>setEmail(e.target.value)} placeholder='Your Email'  type='email' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <input  value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'  type='password' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

             

              <Button onClick={submitHandler} className='mb-4' size='lg'>Sign In</Button>
              <Button onClick={()=>firebase.signUpWithGoogle()} className='mb-4' variant='danger' color='red' size='lg'>Signup with Google</Button>
    
                <p>don't have an account? <a href="/register">Register</a></p>

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
