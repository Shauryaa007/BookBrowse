import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { useFirebase } from "../context/Firebase";

export const ViewOrderDetails=()=>{
    const params=useParams();
    const firebase=useFirebase();

    const [odr,setOdr] = useState([]);

    useEffect(()=>{
        firebase.getOrders(params.bookId).then(orders=>{ setOdr(orders.docs);  console.log(orders.docs[0].data());});
        
        
    },[])

    return(
        
        <div className="container">
            view order deatails 
            
            {
                odr.map((od,idx)=><div key={od.data().userID} style={{border:'3px solid black'}} className="m-5">
                    <h6> Order No. - {idx+1}</h6>
                    <center><h6><u>Customer Details</u></h6></center>
                    <h6> Name - {od.data().displayName}</h6>
                    <h6>Email - {od.data().userEmail}</h6>
                    <h6>Quantity - {od.data().qty}</h6>
                    </div>)
            }
        </div>
    );
}