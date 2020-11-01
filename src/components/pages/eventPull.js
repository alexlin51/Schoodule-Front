import React, { useEffect, useState } from 'react';
import checkLoggedIn from '../auth/checkauth';
import Axios from 'axios';
import dayEdit from '../utils/dayEdit';
import timeEdit from '../utils/timEdit';
import { useHistory } from 'react-router-dom';

import LinkComp from '../course/linkComp';

import './coursePull.css';

export default function EventPull(props) {
    const history = useHistory();

    const [finish, setFinish] = useState(false)
    const [access, setAccess] = useState(true)
    const [load, setLoad] = useState(true)
    const [id, setId] = useState('')

    const [name, setName] = useState('');
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState('');
    const [stime, setStime] = useState('');
    const [etime, setEtime] = useState('');
    const [days, setDays] = useState('');
    const [notes, setNotes] = useState('');
    const [links, setLinks] = useState([]);
 
    useEffect(() =>{

        //protect against people not logged in.    
        checkLoggedIn();

        let token = localStorage.getItem('auth-token');
        let id = props.match.params.id;

        // I want to first verify if the id in the link is connected to a user.
        const verify = async (id) => {

            let answer = await Axios.post(
                'http://localhost:5000/events/check', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );

            if(answer){
                if(answer.data === true){
                    setAccess(true)
                }else{
                    setAccess(false)
                }
            }else{
                console.log('test')
                setAccess(false)
            }
        }

        verify(id)

        // now I want to pull the real data
        const pull = async(id) => {
            const data = await Axios.post(
                'http://localhost:5000/events/grab', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            // set the states here
            setName(data.data.name)
            setSdate(data.data.sdate)
            setEdate(data.data.edate)
            setStime(data.data.stime)
            setEtime(data.data.etime)
            setDays(data.data.days)
            setNotes(data.data.notes)
            setLinks(data.data.links)
            setLoad(false)
        }


        pull(id);
        setId(id);
    
    },[])

    useEffect(() => {
        setFinish(true)
    })

    const courseClick = () => {
        history.push('/dashboard/events')
    }

    const EditClick = () => {
        let urlLink = `/dashboard/events/edit/${id}`
        history.push(urlLink)
    }

    const todoRoute = () => {
        let urlLink = `/dashboard/todo/${id}/${name}`
        history.push(urlLink)
    }

    return (
        <div>
            { (load) ? (
                <>
                    <div className="lbox">
                        { !access && finish ? (
                            <p className='ltext'>Event not found</p>
                        ):(
                            <p className='ltext'>Loading event...</p>
                        ) }
                    </div>               
                </>
            ):(
                <>
                    <div className="ccontainer">
                        <div className="top">
                            <h1 className="ctext">{name}</h1>
                            <button className='topButton' onClick={todoRoute}>To-Do List</button>
                        </div>
                        <div className="divb"></div>
                        <p className="note textb"><strong>Note: </strong>{notes}</p>
                        <p className="clen textb"><strong>Event range: </strong>{sdate} - {edate}</p>
                        <p className="ctimes textb"><strong>Event time: </strong>{timeEdit(stime)} - {timeEdit(etime)}</p>
                        <p className="days textb"><strong>Event day(s): </strong>{dayEdit(days)}</p>
                        <div className="high-box">
                            <p className="Disc textb"><strong>Location/Link(s):</strong></p>
                            { links.map((link) => {
                                return <LinkComp
                                    ltype={link.type}
                                    lnotes={link.notes}
                                    lloc={link.address}
                                    key={link._id}
                                />
                            })}
                        </div>
                    </div>
                    <div className="bottomButtons">
                        <button onClick={courseClick} className="courses buutt">Back to Events</button>
                        <button onClick={ EditClick }className="events buutt">Edit Event</button>
                    </div>
                </>
            )}
        </div>
    )
}