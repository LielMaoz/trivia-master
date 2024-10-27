import './Bar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Bar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(`/`);
    };

    return (
        <div id='bar-container'>
            <div id='logo'>
                <img src='/images/logo.png' onClick={handleLogoClick} />
            </div>
            {/****add more logic here... with disconnect option...*/}
            <div className='links-container'>
                <Link to='/Login/Login' className='link'>
                    Login{' '}
                </Link>
                <Link to='/Signup' className='link'>
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default Bar;
