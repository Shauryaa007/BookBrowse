import {React,useEffect, useState} from "react";
import { useFirebase } from "../context/Firebase";
import CardGroup from 'react-bootstrap/CardGroup';

import { BookCard } from "../components/Card";

export const HomePage=()=>{
    const firebase=useFirebase();

    const [books,setBooks]= useState([])

    useEffect(()=>{
        firebase.listAllBooks().then(books=>{setBooks(books.docs);});
    },[firebase]);

    return(
        <div className="container mt-5">
            
            <CardGroup>
                {
                books.map((book)=><BookCard link={`book/view/${book.id}`} key={book.id} {...book.data()} id={book.id}  />)
            }
            </CardGroup>
            
            
        </div>
    );
}