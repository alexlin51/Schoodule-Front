import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Dash from './components/pages/Dash';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import userContext from './context/userContext';
import Courses from './components/pages/Courses';
import CoursePull from './components/pages/coursePull';
import CourseEdit from './components/pages/courseEdit';
import CourseAdd from './components/pages/addCourse';
import Events from './components/pages/Event';
import EventPull from './components/pages/eventPull';
import EventEdit from './components/pages/eventEdit';
import EventAdd from './components/pages/addEvent';
import ToDoPage from './components/pages/todoPage';
import AboutPage from './components/pages/about';
import HowPage from './components/pages/how';

import './style.css';

export default function App() {
    // we are providing all these componenets with the data from userData
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    // useEffect with an empty array at end will load whenever we finish or start to interact with this page.
    useEffect(() => {
        const checkLoggedIn = async () =>{
            // we want to first check if a token is in local storage
            let token = localStorage.getItem('auth-token');
            if (token === null){
                localStorage.setItem('auth-token', '');
                token = '';
            }
            // make an api call to auth
            const tokenRes = await Axios.post(
                'http://localhost:5000/user/auth', 
                null, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            // now that we have the response, lets update the global state.
            if (tokenRes.data){

                const userRes = await Axios.post(
                    'http://localhost:5000/user/grab',
                    null,
                    { headers: {'X-Auth-Token': token } },
                );

                setUserData({
                    token,
                    user: userRes.data
                });

            }
            
        };

        checkLoggedIn();
    }, []);

    return <>
        <BrowserRouter>
            <userContext.Provider value={{userData, setUserData}}>
                <Header/>
                <Switch>
                    <Route exact path="/" component={ Login } />
                    <Route exact path="/dashboard/courses/show/:id" component={ CoursePull } />
                    <Route exact path="/dashboard" component={ Dash } />
                    <Route exact path="/signup" component={ Register } />
                    <Route exact path="/dashboard/courses" component={ Courses } />
                    <Route exact path="/dashboard/courses/edit/:id" component={ CourseEdit } />
                    <Route exact path="/dashboard/courses/add" component={ CourseAdd } />
                    <Route exact path="/dashboard/events" component={ Events } />
                    <Route exact path="/dashboard/events/show/:id" component={ EventPull } />
                    <Route exact path="/dashboard/events/edit/:id" component={ EventEdit } />
                    <Route exact path="/dashboard/events/add" component={ EventAdd } />
                    <Route exact path="/dashboard/todo/:id/:name" component={ ToDoPage } />
                    <Route exact path="/aboutSchoodule" component={ AboutPage } />
                    <Route exact path="/howToSchoodule" component={ HowPage } />
                    {/* this will auto redirect if an unknown url gets passed. */}
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
                <Footer/>
            </userContext.Provider>
        </BrowserRouter>
    </>;
}
