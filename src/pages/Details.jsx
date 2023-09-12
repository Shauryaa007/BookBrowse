import {React,useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import { useFirebase } from "../context/Firebase";
import { Button, Placeholder } from "react-bootstrap";
import Form from 'react-bootstrap/Form';


export const Details=()=>{
    const firebase=useFirebase();
    const params=useParams();
    //console.log(params);

    const [bookdata,setBookdata]=useState(null);

    const [url,setURL]=useState(null);

    const [qty,setQty]=useState(1);

    const placeOrder=async()=>{
        const result = await firebase.placeOrder(params.bookId,qty)
        console.log("order placed",result);
    }


    useEffect(()=>{
        firebase.getBookById(params.bookId).then(book=>setBookdata(book.data()));
        
    },[]);

    useEffect(()=>{
        if(bookdata){
           firebase.getImageURL(bookdata.imageURL).then(url=>setURL(url)); 
        }
    },[bookdata]);

    if(!bookdata) return(<h1>Loading....</h1>);
    else
    //console.log(bookdata)
    return(
        <>
        <div style={{border:'2px solid black'}} className="container mt-5">
            {/* <h1>{bookdata.name}</h1> */}
        <img src={url} alt="Loading_Image.." style={{borderRadius:'10px',width:'80%', marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}/>    
        <div style={{border:'2px solid black', textAlign:'center'}}>{ <h1>Title:- {bookdata.name}</h1> }</div>
        <h1>Details</h1>
        <h4>Price: {bookdata.price}</h4>
        <h4>ISBN: {bookdata.isbn}</h4>
        <h1>Owner Details</h1>
        <h4>Name: {(bookdata.userName)}</h4>
        <h4>Email: {(bookdata.userEmail)}</h4>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity:</Form.Label>
        <Form.Control type="Number"  value={qty} onChange={e=>setQty(e.target.value)}/>
      </Form.Group>
        <Button onClick={placeOrder} variant="success">Buy Now</Button>
        </div>
        </>
        
    );
}