import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userContext from '../../context/userContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import './auth.css';

export default function Register() {
    const history = useHistory();

    const[email, setEmail] = useState();
    const[fname, setFname] = useState();
    const[lname, setLname] = useState();
    const[password, setPassword] = useState();
    const[school, setSchool] = useState();
    // make sure to add the onchange function so that it updates the states.

    const[hasError, setHasError] = useState(false);
    const[eerror, setEerror] = useState('');
    const[perror, setPerror] = useState('');
    const[ferror, setFerror] = useState('');
    const[lerror, setLerror] = useState('');
    const[serror, setSerror] = useState('');

    const {setUserData} = useContext(userContext);

    // submit process
    const submit = async (e)=> {
        e.preventDefault();
       // what do we want to do --> take all the information and send to api --> recieve api and interpret || if good, we want to send request to login and set the token, otherwise we will just set the error messages.
       const userReq = { email, password, fname, lname, school };
       
       try{
            await Axios.post('http://localhost:5000/user/signup', userReq);
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
            console.log(issue)
            setHasError(true);
            setEerror(issue.email);
            setPerror(issue.password);
            setFerror(issue.fname);
            setLerror(issue.lname);
            setSerror(issue.school);
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
                        (hasError && eerror !== '') ? (
                        <p className='errorSmall'>*{ eerror }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    {
                        (hasError && perror !== '') ? (
                        <p className='errorSmall'>*{ perror }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    {
                        (hasError && ferror !== '') ? (
                        <p className='errorSmall'>*{ ferror }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasicfname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={e => setFname(e.target.value)}/>
                    </Form.Group>

                    {
                        (hasError && lerror !== '') ? (
                        <p className='errorSmall'>*{ ferror }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasiclname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={e => setLname(e.target.value)}/>
                    </Form.Group>

                    {
                        (hasError && serror !== '') ? (
                        <p className='errorSmall'>*{ serror }</p>
                        ) : (
                            <div></div>
                        )
                    }

                    <Form.Group className="spacing" controlId="formBasicSchool">
                        <Form.Label>School</Form.Label>
                        <Form.Control type="text" placeholder="School" onChange={e => setSchool(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary myButton" type="submit">
                        Sign Me Up!
                    </Button>

                </Form>
            </div>
        </div>
    )
}
