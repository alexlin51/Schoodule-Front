import React, { useEffect, useState } from 'react'
import CourseList from '../course/courseList'
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth'
import { useHistory } from 'react-router-dom';

import './Courses.css';

export default function Courses() {
    const history = useHistory();
    const [listCourse, setListCourse] = useState([]);

    useEffect(() =>{

        // protect against people not logged in.
        checkLoggedIn();


        // I want to populate the list course
        const showCourse = async () => {
            let token = localStorage.getItem('auth-token');

            const list = await Axios.post(
                'http://localhost:5000/courses/show', 
                null, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            let newlist = list.data.courses;
            setListCourse(listCourse => newlist)
        }

        showCourse();
    },[])

    const addCourse = () =>{
        let curlLink = `/dashboard/courses/add`
        history.push(curlLink)
    }

    return (
        <div className='CoursesContainer'>
            <div className="Cheader">
                <h1 className="Ctitle">My Courses</h1>
                <button onClick={addCourse} className="addCourse">Add Course</button>
            </div>
            <div className="bar"></div>
            { listCourse.map((coursepiece, index)=>{
                let courseName = coursepiece.name;
                let myColor = coursepiece.color;
                let courseId = coursepiece._id;
                return <CourseList type="course" key={courseId} name={courseName} color={myColor} id={courseId}/>
            })}
        </div>
    )
}

