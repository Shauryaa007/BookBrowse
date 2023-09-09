import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState} from "react";
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';


import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage
}
from 'mdb-react-ui-kit';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


export const ListingPage=()=>{

    const firebase=useFirebase();

    const [name,setName]=useState("");
    const [isbnNumber,setIsbnNumber]=useState("");
    const [price,setPrice]=useState("");
    const [coverPic,setCoverPic]=useState("");    

    const submitHandler=(e)=>{
       if(name===""||isbnNumber===""){alert("Enter Book Name and isbn")}
       else{
        e.preventDefault();
        firebase.handleCreateNewListing(name,isbnNumber,price,coverPic);
       }
      
  }



    return (
        <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '100px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">List your Book for Sale</p>

              

              <div className="d-flex flex-row align-items-center mb-4">
                <label style={{fontSize:'20px',marginRight:'20px'}} htmlFor="name">Book Name : </label>
                <input required value={name} onChange={e=>setName(e.target.value)} placeholder='Enter Book Name'  type='text' size={25} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <label style={{fontSize:'20px',marginRight:'20px'}} htmlFor="name">ISBN Number : </label>
                <input required value={isbnNumber} onChange={e=>setIsbnNumber(e.target.value)} placeholder='ISBN Number' width={'300px'} type='number' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <label style={{fontSize:'20px',marginRight:'20px'}} htmlFor="name">Book Price : </label>
                <input required value={price} onChange={e=>setPrice(e.target.value)} placeholder='Enter the price'  type='number' size={30} style={{height:'40px', borderRadius:'10px'}}/>
              </div>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <label style={{fontSize:'20px',}} htmlFor="name">Cover Photo : </label>
             <Form.Control style={{height:'40px', borderRadius:'10px'}} type="file"  onChange={e=>setCoverPic(e.target.files[0])}/>
              </Form.Group>

             

              <Button onClick={submitHandler} className='mb-4' size='lg'>Add Book</Button>
              

            </MDBCol>

            <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=2000' fluid/>
            </MDBCol>
            

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    );
}
