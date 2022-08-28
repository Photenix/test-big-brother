import { useNavigate } from 'react-router-dom';
import '../../styles/sass/BigButton.scss'

const HomeNotRegister = () => {
    const nav = useNavigate()

    return (
        <div className='big-button not'>
            <button onClick={()=>nav('/sing-in')}>Sing In</button>
            <button onClick={()=>nav('/sing-up')}>Sing Up</button>
        </div>
    );
};

export default HomeNotRegister;