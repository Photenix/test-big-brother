import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateClass from '../components/CreateClass';
import CreateTeacher from '../components/CreateTeacher';
import HomeNotRegister from '../components/home/HomeNotRegister';
import HomeRegister from '../components/home/HomeRegister';
import SearchClass from '../components/SearchClass';
import SingIn from '../components/SingIn';
import SingUp from '../components/SingUp';
import { existUser } from '../CRUD/user';
import { authentication } from '../firebase.config';
import { login } from '../redux/actions/actionLogin';
import { PrivateRouter as PriR} from './PrivateRouter';
import { PublicRouter as PubR } from './PublicRouter';

const AppRouters = () => {

    const [ isAuth, setIsAuth ] = useState( false )

    const dispatch = useDispatch()

    useEffect( ()=> {
        onAuthStateChanged( authentication, 
            user => {
                if(user?.uid) {
                    setIsAuth( true )
                    dispatch( login( user.email, '', user.displayName ))
                }
                else ''
            })
    },[])
    /* 
    useEffect( () =>{
        //console.log( isNavBar );
    },[ isNavBar ]) */

    return (
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={ <h1> {
                        isAuth 
                            ?<HomeRegister />
                            :<HomeNotRegister />
                        } 
                    </h1> }/>
				<Route path="/sing-in" 
                    element={ 
                        <PubR isAuth={isAuth}> <SingIn /> </PubR> 
                    }
                    />
				<Route path="/sing-up" 
                    element={ 
                        <PubR isAuth={isAuth}> <SingUp /> </PubR> 
                    }
                    />
				<Route path="/create-teacher" 
                    element={ 
                        <PriR isAuth={isAuth}> 
                            <CreateTeacher />
                        </PriR>
                    }/>
				<Route path="/create-class" 
                    element={ 
                        <PriR isAuth={isAuth}>
                            <CreateClass />
                        </PriR>
                    }/>
				<Route path="/search" 
                    element={ 
                        <PriR isAuth={isAuth}>
                            <SearchClass/>
                        </PriR>
                    }/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouters;