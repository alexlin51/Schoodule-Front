import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth';
import surveyProc from '../surveyFunctions/survey';

import './Dash.css';

export default function Dash() {
    const history = useHistory();

    const [events, setEvents] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() =>{
        // Link protection
        checkLoggedIn()

        fillEvent()

        surveyProc()
    },[])

    const fillEvent = async () =>{
        // make api call to pull the needed events
        let token = localStorage.getItem('auth-token');
        const pullEvents = async (token) => {
            let eventList = await Axios.post(
                'http://localhost:5000/calender/grabEvents', 
                null,
                { headers: { 'X-Auth-Token': token } },
            );
            
            setEvents(eventList.data.events)
        }

        await pullEvents(token)

        loadFunc()
    }

    const loadFunc = () =>{
        setLoad(false)
    }

    const pushCoursePage = () => {
        history.push('/dashboard/courses');
        window.location.reload()
    }
    
    const pushEventPage = () => {
        history.push('/dashboard/events');
        window.location.reload()
    }

    return (
        <div>
            { load ? (
                <>
                    <div className='loadCalender'>
                        <span className='loadtext'>Loading schoodule...</span>
                    </div>
                </>
            ): (
                <>
                     <div className="box">
                        <FullCalendar 
                            plugins={[ timeGridPlugin ]} 
                            initialView="timeGridWeek" 
                            allDaySlot={false} 
                            slotMinTime={"07:00:00"}
                            slotMaxTime={"22:00:00"}
                            expandRows={true}
                            height={"700px"}
                            events={events}
                        />
                    </div>
                </>
            )}
            <div className="bottomButtons">
                <button onClick={ pushCoursePage } className="courses buutt">Courses</button>
                <button onClick={ pushEventPage } className="events buutt">Events</button>
            </div>
        </div>
    )
}
