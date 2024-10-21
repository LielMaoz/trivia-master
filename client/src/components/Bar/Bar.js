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
                <img
                    src='./images/triviaMasterHeader3.png'
                    onClick={handleLogoClick}
                />
            </div>
            {/****add more logic here... with disconnect option...*/}

            <Link to='/'>Home screen</Link>
            <Link to='/Login/Login'>Login </Link>
            <Link to='/Sign/Signup'>Sign up</Link>
        </div>
    );
};

export default Bar;
