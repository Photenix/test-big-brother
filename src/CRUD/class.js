import { getDocs, collection, addDoc, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const createClass = async( obj_class ) =>{
    //console.log({ ...obj_teacher} )
    const docRef  = await addDoc(collection(db, "monitorias"),{
        ...obj_class
    });
    //console.log("Document written with ID: ", docRef.id);
}

export const getClass = async() =>{
    const querySnapshot = await getDocs(collection(db, "monitorias"));

    const arr = []
    querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        //console.log(`${doc.id} => ${doc.data()}`);
        let x = doc.data()
        x.uid = doc.id
        arr.push( x )
    });

    return arr
}

export const filterExatliClass = async( find, value ) =>{
    const q = query(collection(db, 'monitorias'), where( find, '==', value ));
    const querySnapshot = await getDocs( q );

    const arr = []
    querySnapshot.forEach((doc) => {
        /* console.log(doc.id, ' => ', doc.data());
        console.log(doc.data()); */
        arr.push( doc.data() )
    });
    
    return arr
}

export const filterClass = async( find, value ) =>{
    const data = await getClass()
    const filtrado = data.filter( obj => obj[find].includes(value) )
    return filtrado
}


export const deletClass = async( uid ) =>{
    await deleteDoc( doc(db, 'monitorias', uid ) )
}

export const updateClass = async( uid, json ) =>{
    //console.log( json, uid )
    const docRef = doc(db, 'monitorias', uid );
    /* await setDoc(docRef, {
        ...json
    }); */
    await updateDoc(docRef, {
        salon: json
    });
}