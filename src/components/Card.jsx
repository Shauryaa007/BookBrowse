import {React , useEffect,useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export const BookCard=(props)=>{
 
    const navigate=useNavigate();

    const [url,setURL]=useState(null);

    const firebase=useFirebase();

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then(url=>setURL(url));
    },[]);


    return(
        <Card style={{ width: '25rem' , margin:'15px', border:'2px solid black', borderRadius:'10px'}}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title "{props.name}"  sold by {props.userName} and having price of {props.price} 
        </Card.Text> 
        <Button onClick={e=>{navigate(props.link)}} variant="primary">View</Button>
      </Card.Body>
    </Card>
    );
}