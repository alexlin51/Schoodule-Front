import React, { useEffect, useState } from 'react'
import CourseList from '../course/courseList'
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth'
import { useHistory } from 'react-router-dom';

import './Courses.css';

export default function Events() {
    const history = useHistory();
    const [listCourse, setListCourse] = useState([]);

    useEffect(() =>{

        // protect against people not logged in.
        checkLoggedIn();


        // I want to populate the list course
        const showCourse = async () => {
            let token = localStorage.getItem('auth-token');

            const list = await Axios.post(
                'http://localhost:5000/events/show', 
                null, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            let newlist = list.data.events;
            setListCourse(newlist)
        }

        showCourse();
    },[])

    const addEvent = () => {
        history.push('/dashboard/events/add')
    }

    return (
        <div className='CoursesContainer'>
            <div className="Cheader">
                <h1 className="Ctitle">My Events</h1>
                <button onClick={addEvent} className="addCourse">Add Event</button>
            </div>
            <div className="bar"></div>
            { listCourse.map((coursepiece, index)=>{
                let courseName = coursepiece.name;
                let myColor = coursepiece.color;
                let courseId = coursepiece._id;
                return <CourseList type="event" key={courseId} name={courseName} color={myColor} id={courseId}/>
            })}
        </div>
    )
}

