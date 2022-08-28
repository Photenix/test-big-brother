import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

export const existUser = async ( uid ) =>{
    const q = query(collection(db, 'monitores'),
        where('cedula', '==', uid));
    
    const querySnapshot = await getDocs( q );

    const arr = []
    querySnapshot.forEach((doc) => {
        /* console.log(doc.id, ' => ', doc.data());
        console.log(doc.data()); */
        arr.push( doc.data() )
    });


    if( arr ){
        
    }
}