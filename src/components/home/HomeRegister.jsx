import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../redux/actions/actionLogin';
import '../../styles/sass/BigButton.scss'

const HomeRegister = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const  { user }  = useSelector( state => state.login ) 

    return (
        <div className='big-button'>
            <h1>{ `Bienvenido ` }</h1>
            <h1>{ user.name }</h1>
            <button onClick={ () =>  nav('/create-teacher') }>Crear monitor</button>
            <button onClick={ () =>  nav('/create-class') }>Crear mentoria</button>
            <button onClick={ () =>  nav('/search') } >Buscar mentoria</button>
            <button 
                onClick={ () => {
                        dispatch( logoutAsync() )
                        location.reload();
                    } }>Log Out</button>
        </div>
    );
};

export default HomeRegister;