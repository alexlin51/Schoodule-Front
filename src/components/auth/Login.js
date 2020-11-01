import React, {useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userContext from '../../context/userContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import './auth.css';

export default function Login() {
    const history = useHistory();

    const[email, setEmail] = useState();
    const[password, setPassword] = useState(); 
    // make sure to add the onchange function so that it updates the states.

    useEffect(() =>{
        if(localStorage.getItem('auth-token') !== ""){
            window.location.href = '/dashboard';
        }
    },[])

    // error state storage
    const[hasError, setHasError] = useState(false);
    const[errMsg, setErrMsg] = useState('');

    const {setUserData} = useContext(userContext);
    // submit process
    const submit = async (e)=> {
        e.preventDefault();
        // what do we want to do --> take all the information and send to api --> recieve api and interpret || if good, we want to send request to login and set the token, otherwise we will just set the error messages.
        try{
            const loginRes = await Axios.post('http://localhost:5000/user/login',{email, password});
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })
            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/dashboard');
            window.location.reload(false);
        } catch (err) {
            const issue = err.response.data
            // so we know if it goes here, there is the fat error message. we need to add to each little textholder.
            setErrMsg(issue.error);
            setHasError(true);
        }
    }


    return (
        <div>
            <div className="topper">
                <h1 className="text">Schoodule</h1>
                <h1 className='subText'>A student's toolbook for success.</h1>
            </div>
            <div className="container">
                <Form onSubmit={submit}>

                    {
                        hasError ? (
                        <p className='error'>*{ errMsg }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="spacing" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary myButton" type="submit">
                        Log in
                    </Button>

                </Form>
            </div>
        </div>
        
    )
}
