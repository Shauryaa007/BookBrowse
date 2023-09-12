import {React,useEffect, useState} from "react";
import { useFirebase } from "../context/Firebase";

import { BookCard } from "../components/Card";

export const HomePage=()=>{
    const firebase=useFirebase();

    const [books,setBooks]= useState([])

    useEffect(()=>{
        firebase.listAllBooks().then(books=>{setBooks(books.docs);});
    },[firebase]);

    console.log(firebase.user);

    const styles={
        display:'flex',
        flexWrap: 'wrap',
        //justifyContent:'space-between',
        //border:'2px solid black'
    };

    return(
        <>
        <div style={{textAlign:'center', fontSize:'30px', fontWeight:'bolder', fontFamily:'cursive'}}>Books to live by.</div>
        <div style={styles}className="m-4">
                {
                books.map((book)=><BookCard 
                link={`book/view/${book.id}`} 
                key={book.id} 
                {...book.data()} 
                id={book.id} 
                btntitle={"View"}
                varient={"danger"}
                />)
            }
            </div></>
    );
}