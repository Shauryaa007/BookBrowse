import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { BookCard } from "../components/Card";
import { Navigate } from "react-router-dom";

export const ViewOrders=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);

    useEffect(()=>{
        if(firebase.is_loggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then(books=>setBooks(books.docs));
        
        
    },[firebase,])

    console.log(books);

    return (
        <div>
         {books.map((book) => (
        <BookCard
          link={`/book/order/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
    );
}



////   36.18