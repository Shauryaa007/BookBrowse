import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { BookCard } from "../components/Card";

export const ViewOrders=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);

    useEffect(()=>{
        if(firebase.is_loggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then(books=>setBooks(books.docs));
        
        
    },[firebase,])

    console.log(books);

    const styles={
      display:'flex',
      flexWrap: 'wrap',
      //justifyContent:'space-between',
      //border:'2px solid black'
  };

    return (<>
    <div style={{textAlign:'center', fontSize:'30px', fontWeight:'bolder', fontFamily:'cursive'}}>My Books</div>
        <div style={styles}className="m-5">
         {books.map((book) => (
        <BookCard
          link={`/book/order/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
          btntitle={"View Orders"}
          varient={"success"}
        />
      ))}
    </div>
    </>
    );
}



////   36.18