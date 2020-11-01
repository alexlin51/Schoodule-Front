import React, { useEffect, useState }from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth';

import EventHolder from '../editEventForms/EventHolder';

import dataCheck from '../utils/dataCheck';
import daySyntax from '../utils/todayFinder';
import timeCompare from '../utils/timeCompare';

import './courseEdit.css';

export default function EventAdd(props) {
    const history = useHistory();

    // I want to auth first
    useEffect(()=>{
        checkLoggedIn()
    },[])

    let today = new Date()
    const [button2, setButton2] = useState(false)
    const [button, setButton] = useState(false)

    let empty = {
        name: '',
        color: "#dd5a5a",
        sdate: daySyntax(today),
        edate: daySyntax(today),
        days: "",
        stime: "00:00",
        etime: "00:01",
        links: []
    }

    const [name, setName] = useState('')
    const [data, setData] = useState(empty)
    const [updateData, setUpdateData] = useState(empty)
    const [error1, setError1] = useState(false)
   
    const show = () => {
        console.log(updateData)
        console.log(data)
    }

    const backCourse = () =>{
        history.push('/dashboard/events')
    }

    const pushData = async () => {
        setButton2(true)

        let issue = timeCompare(updateData.stime, updateData.etime)
        let token = localStorage.getItem('auth-token');
        if(issue){
            window.alert('Error: Ensure that time entries are ordered and valid. Note that boxes should appear red if an issue is detected.')
        } else{
            const createData = async () => {
                const data = await Axios.post(
                    'http://localhost:5000/events/push', 
                    updateData, 
                    { headers: { 'X-Auth-Token': token } },
                );
                
                return data.data.id
            }
            let createdID = ''
            try{
                createdID = await createData()
            } catch(err){
                console.log(err.message)
            }

            let curlLink = `/dashboard/events/show/${createdID}`
            history.push(curlLink)
        }

        setButton2(false)
    }

    return (
        <div>
            <div className="ccontainer"> 
                <h1 className="ctext">Add new event | {name}</h1>
                <div className="divb"></div>
                <EventHolder 
                    info={data} 
                    setInfo={setData}
                    updateInfo={updateData}
                    setUpdateInfo={setUpdateData}
                    name={name}
                    setName={setName}
                    error1={error1}
                    setError1={setError1}
                />
            </div>
            <div className="bottomButtons">
                <button onClick={backCourse} className={`buutt ${button ? "pressed" : ""}`}>Back to Events</button>
                <button disabled={button2} onClick={pushData} className={`buutt ${button2 ? "pressed" : ""}`}>Save Event</button>
            </div>
        </div>
    )
}