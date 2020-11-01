import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../../context/userContext';

import './header.css'

export default function Header() {
    // bring in the state information
    const { userData, setUserData } = useContext(userContext);

    const history = useHistory();

    const register = () => history.push('/signup');
    const login = () => history.push('/')
    const logout = () => {
        // clear the state information and local storage
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '');
        history.push('/');
    }

    const AboutPage = () => {
        history.push('/aboutSchoodule')
    }

    const HowPage = () => {
        history.push('/howToSchoodule')
    }

    const homeLink = () => {
        history.push('/')
    }

    // I want to make conditional rendering based off the name.
    return (
        <div className="head">
            {userData.user ? (
                <>
                    <div className="split">
                        <a href="/dashboard"><p className="logo">Schoodule</p></a>
                        <div>
                            <span onClick={AboutPage} className="who">About Us</span>
                            <span onClick={HowPage} className="who">How to Schoodule?</span>
                            <button onClick={logout}className="button">Log out</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="right">
                        <span onClick={homeLink} className="who">Home</span>
                        <span onClick={AboutPage} className="who">About Us</span>
                        <span onClick={HowPage} className="who">How to Schoodule?</span>
                        <button onClick={login} className='button'>Login</button>
                        <button onClick={register} className='button'>Sign up</button>
                    </div>
                </>
            )}
        </div>
    )
}
