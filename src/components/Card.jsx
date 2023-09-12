import {React , useEffect,useState} from "react";
import Button from 'react-bootstrap/Button';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import "./Card.css"

export const BookCard=(props)=>{
 
    const navigate=useNavigate();

    const [url,setURL]=useState(null);

    const firebase=useFirebase();

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then(url=>setURL(url));
    },[]);


    return(
        <div className="bookcard">
        <img src={url} alt="" className="bookimg" />
       {/* <div className="title"><b>Tittle:</b> {props.name}</div> */}
       {/* <p>{props.name}</p>
       <p>{props.userName}</p>
       <p>{props.userEmail}</p> */}
       <Button className="btnn" onClick={e=>{navigate(props.link)}} variant={props.varient}>{props.btntitle}</Button>
    </div>
  );
};
 
        