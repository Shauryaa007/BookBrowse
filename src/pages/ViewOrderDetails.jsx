import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";

export const ViewOrderDetails=()=>{
    const params=useParams();
    const firebase=useFirebase();


    
        const handleAccept = (customer,book) => {
            //console.log(useremail);
          const recipient = customer.userEmail; // Replace with the recipient's email address
          const subject = 'BOOKBROWSE: Request for Your Contact Details - Book Delivery';
          const body = (`Dear ${customer.displayName}\n\n`+

          "I hope this message finds you well. I am writing to you as the owner of the book you ordered , and I would like to thank you for choosing this book for your recent book purchase. We sincerely appreciate your support.\n\n"+
          
          "In order to ensure the smooth and timely delivery of your book, we kindly request your contact details. Having your contact information will enable us to:\n\n"+
          
          "1. Provide you with updates on the status of your order.\n"+
          "2. Coordinate delivery details to ensure it aligns with your convenience./n"+
          "3. Address any potential delivery-related concerns promptly.\n\n"+
          
          "Please provide us with the following information:\n\n"+
          
          "1. Full Name:\n"+
          "2. Contact Number:\n"+
          "3. Delivery Address:\n\n"+
          
          "You can reply to this email with the requested details.\n\n"+
          
          "Rest assured, we take your privacy seriously, and your contact information will be kept confidential and used solely for the purpose of delivering your order and providing updates.\n\n"+
          
          "Please verify your order, in case of any query related to order you can reply to this mail.\n"+
          `Your Order : \n`+
          `Book-  ${book.name}\n`+
          `Quantity- ${customer.qty}\n`+
          `Total Amount- Rs. ${Number(customer.qty)*Number(book.price)}\n\n`+
          
          "If you have any questions or require further assistance, please do not hesitate to get in touch with us. \n\n"+
          
          "We look forward to delivering your book to you promptly and exceeding your expectations with our service. \n\n"+
          
          "Warm regards") ;
      
          // Create a mailto URI with the recipient, subject, and body
          const mailtoUri = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
          // Open the user's default email client with the pre-filled content
          window.location.href = mailtoUri;
        };



        const handleReject = (customer,book) => {
            //console.log(useremail);
          const recipient = customer.userEmail; // Replace with the recipient's email address
          const subject = 'BOOKBROWSE: Important Update Regarding Your Book Order';
          const body = (`Dear ${customer.displayName}\n\n`+

          "We regret to inform you that due to unforeseen circumstances, we are unable to deliver your book. Our team is working diligently to resolve this issue.\n"+
          "We apologize for any inconvenience and appreciate your understanding./n/n"+
          
          "Please verify your order, in case of any query related to order you can reply to this mail.\n"+
          `Your Order : \n`+
          `Book-  ${book.name}\n`+
          `Quantity- ${customer.qty}\n`+
          `Total Amount- Rs. ${Number(customer.qty)*Number(book.price)}\n\n`+
          
          "If you have any questions or require further assistance, please do not hesitate to get in touch with us. \n\n"+
          
          "Sincerely") ;
      
          // Create a mailto URI with the recipient, subject, and body
          const mailtoUri = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
          // Open the user's default email client with the pre-filled content
          window.location.href = mailtoUri;
        };

    

    const [odr,setOdr] = useState([]);
    const [book,setBook] = useState([]);
    useEffect(()=>{
        firebase.getOrders(params.bookId).then(orders=>{ setOdr(orders.docs); });
        firebase.getBookById(params.bookId).then(book=>{setBook(book.data())});
        
    },[])

    if(odr.length===0) return(<div style={{textAlign:'center', fontSize:'30px', fontWeight:'bolder', fontFamily:'cursive'}}>No orders on this book :- {book.name}</div>);

    

    return(
        
        <div className="container" >
            <div style={{textAlign:'center', fontSize:'30px', fontWeight:'bolder', fontFamily:'cursive'}}>View Order Details of  "{book.name}"</div>

            <div >
            {
                odr.map((od,idx)=><div key={idx} style={{border:'3px solid black', borderRadius:'10px'}} className="m-5 p-3" >
                    <h6 className="text-break"> Order No. - {idx+1}</h6>
                    <h6 className="text-break"> Book Name - {book.name}</h6>
                    <h6 className="text-break"> Book Price - {book.price} Rs.</h6>
                    <h6 className="text-break"><b>Quantity</b> - {od.data().qty}</h6>
                    <center className="text-break"><h6><u >Customer Details</u></h6></center>
                    <h6 className="text-break"> <b>Name</b> - {od.data().displayName}</h6>
                    <h6 className="text-break" ><b>Email </b>- {od.data().userEmail}</h6>
                    <h6 className="text-break"><b>Order Amount</b> - {od.data().qty} X {book.price} = Rs. {Number(od.data().qty)*Number(book.price)}</h6>
                    <Button variant="success" style={{borderRadius:'20px'}} onClick={()=>handleAccept(od.data(),book)}>Accept</Button>
                    <Button variant="danger" style={{borderRadius:'20px'}} onClick={()=>handleReject(od.data(),book)}>Reject</Button>
                    </div>)
            }
            </div>
            
        </div>
    );
}