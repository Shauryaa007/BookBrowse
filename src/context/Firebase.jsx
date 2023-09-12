import { createContext , useContext,useEffect,useState} from "react";
import {initializeApp} from 'firebase/app'

import {getFirestore, collection, addDoc,getDocs,doc,getDoc, query, where} from 'firebase/firestore'

import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import {
    getAuth,
     createUserWithEmailAndPassword , 
     signInWithEmailAndPassword, 
     GoogleAuthProvider,
     signInWithPopup,
     onAuthStateChanged,
     signOut
    } from 'firebase/auth'

const FirebaseContext = createContext(null);

export  const useFirebase=()=>useContext(FirebaseContext);  // costum hook



const firebaseConfig = {
    apiKey: "AIzaSyDEgVxy4UZJHTZBjzHufqdMEWanuVb6fIE",
    authDomain: "bookify-2c1dd.firebaseapp.com",
    projectId: "bookify-2c1dd",
    storageBucket: "bookify-2c1dd.appspot.com",
    messagingSenderId: "186424398493",
    appId: "1:186424398493:web:37913bc681d9e63eb93a74"
  };
  
export  const firebaseApp = initializeApp(firebaseConfig);
        const firebaseAuth=getAuth(firebaseApp);
export  const firestore=getFirestore(firebaseApp);
        const storage=getStorage(firebaseApp);

export const FirebaseProvider=(props)=>{

    const [user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user){setUser(user);}
            else setUser(null);
        })
    },[])

    const is_loggedIn=user?true:false;

    const signUpUserWithEmialAndPass=(email,pass,)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,pass).then(value=>{}).catch(err=>alert(err));
        
    }

    const getUserName=(name)=>{
        const user = firebaseAuth.currentUser;
         if (user !== null) {user.displayName=name;}
         console.log(user.displayName);
     }

    const logInUserWithEmialAndPass=(email,pass)=>{
        signInWithEmailAndPassword(firebaseAuth,email,pass).then(value=>{}).catch(err=>alert(err));
        
    }

    const googleProvider=new GoogleAuthProvider();
    const signUpWithGoogle=()=>{signInWithPopup(firebaseAuth,googleProvider)}

    //const logout=()=>{signOut(firebaseAuth)}

    //console.log(user);

    const handleCreateNewListing=async(name,isbn,price,cover)=>{
        const imageRef= ref(storage,`uploads/images/${Date.now()}-${cover.name}`)

        const uploadResult=await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,'Books'),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userID:user.uid,
            userName:user.displayName,
            userEmail:user.email,
            photoURL:user.photoURL
        }).then(value=>{alert("Book Listed")}).catch(err=>alert(err))
    }

    const listAllBooks =()=>{
        return getDocs(collection(firestore,'Books'));
    }

    const getImageURL=(path)=>{
        return getDownloadURL(ref(storage,path))
    }

    const getBookById=async(id)=>{
        const docRef=doc(firestore,'Books',id);

        const result=await getDoc(docRef);
        return  result;

    }

    const placeOrder=async(bookId,qty)=>{
        const collectionRef= collection(firestore, "Books", bookId, "Orders");
        //console.log(user);
        const result = await addDoc(collectionRef,{

            userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
            qty:Number(qty)
            
        })

        return result;
    }
    
    const fetchMyBooks= async (userId)=>{
        if(!user)return;
        const collectionRef=collection(firestore,"Books");
        const q= query(collectionRef,where("userID","==", userId));

        const result= await getDocs(q);
        return result;
    }

    const getOrders= async (bookId)=>{
        const collectionRef=collection(firestore, "Books", bookId ,"Orders");
        const result=await getDocs(collectionRef);

        return result;
        
    }

    

    

    
    return (
        <FirebaseContext.Provider value={{
            user,
            signUpUserWithEmialAndPass,
            logInUserWithEmialAndPass,
            signUpWithGoogle,
            signOut,
            firebaseAuth,
            is_loggedIn,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            getBookById,
            placeOrder,
            fetchMyBooks,
            getOrders,
            getUserName
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}