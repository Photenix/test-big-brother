import { FacebookAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { providerGoogle, providerFacebook } from '../../firebase.config'

import { typesLogin } from "../types/types"

export const logoutAsync = () => {
    return(dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then((user) => {
                dispatch(logout)
                console.log( 'he salido' )
            })
            .catch(error => {
                console.error(error)
            })
    }
}
export const logout = () => {
    return{
        type: typesLogin.logout,
    }
}

export const loginEmailyPassAsync =(email, password) =>{
    console.log( email, password )
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user})=>{
                return( dispatch ) => dispatch(login(user.email, user.password))
            })
            .catch(error=>{
                console.log(error)
            })
}

export const loginGoogleAsync =()=>{
    return (dispatch)=>{
        const auth = getAuth()
        signInWithPopup(auth, providerGoogle)
        .then(({user})=>{
            dispatch(login( user.email, '', user.displayName ))
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const signInWithFacebook = () => {
    const auth = getAuth()
    signInWithPopup( auth, providerFacebook )
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log(result);
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}

export const login = (email, password, name) =>{
    return{
        type: typesLogin.login, 
        payload: {
            name,
            email, 
            password
        }
    }
}
