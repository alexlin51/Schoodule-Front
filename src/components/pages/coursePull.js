import React, { useEffect, useState } from 'react';
import checkLoggedIn from '../auth/checkauth';
import Axios from 'axios';
import dayEdit from '../utils/dayEdit';
import timeEdit from '../utils/timEdit';
import { useHistory } from 'react-router-dom';

import DisComp from '../course/DisComp';
import PersonComp from '../course/personComp';
import LinkComp from '../course/linkComp';
import AssessComp from '../course/assessComp';

import './coursePull.css';

export default function CoursePull(props) {
    const history = useHistory();

    const [finish, setFinish] = useState(false)
    const [access, setAccess] = useState(true)
    const [load, setLoad] = useState(true)
    const [test, setTest] = useState([])
    const [cname, setCname] = useState('')
    const [notes, setNotes] = useState('')
    const [sdate, setSdate] = useState('')
    const [edate, setEdate] = useState('')
    const [stime, setStime] = useState('')
    const [etime, setEtime] = useState('')
    const [disc, setDisc] = useState([])
    const [link, setLink] = useState([])
    const [day, setDay] = useState('')
    const [prof, setProf] = useState([])
    const [ta, setTa] = useState([])
    const [id, setId] = useState('')
 
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
                'http://localhost:5000/courses/grab', 
                { course: id }, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            setProf(data.data.professor)
            setCname(data.data.name)
            setSdate(data.data.sdate)
            setEdate(data.data.edate)
            setStime(data.data.stime)
            setEtime(data.data.etime)
            setNotes(data.data.notes)
            setDisc(data.data.discussion)
            setLink(data.data.links)
            setDay(data.data.days)
            setTest(data.data.assess)
            setTa(data.data.ta)
            setLoad(false)
        }


        pull(id);
        setId(id);
    
    },[])

    useEffect(() => {
        setFinish(true)
    })

    const courseClick = () => {
        history.push('/dashboard/courses')

    }

    const EditClick = () => {
        let urlLink = `/dashboard/courses/edit/${id}`
        history.push(urlLink)
    }

    const todoRoute = () => {
        let urlLink = `/dashboard/todo/${id}/${cname}`
        history.push(urlLink)
    }

    return (
        <div>
            { (load) ? (
                <>
                    <div className="lbox">
                        { !access && finish ? (
                            <p className='ltext'>Course not found</p>
                        ):(
                            <p className='ltext'>Loading course...</p>
                        ) }
                    </div>               
                </>
            ):(
                <>
                    <div className="ccontainer">
                        <div className="top">
                            <h1 className="ctext">{cname}</h1>
                            <button className='topButton' onClick={todoRoute}>To-Do List</button>
                        </div>
                        <div className="divb"></div>
                        <p className="note textb"><strong>Note: </strong>{notes}</p>
                        <p className="clen textb"><strong>Course range: </strong>{sdate} - {edate}</p>
                        <p className="ctimes textb"><strong>Lecture time: </strong>{timeEdit(stime)} - {timeEdit(etime)}</p>
                        <p className="days textb"><strong>Lecture day(s): </strong>{dayEdit(day)}</p>
                        <div className="high-box">
                            <p className="Disc textb"><strong>Location/Link(s):</strong></p>
                            { link.map((link) => {
                                return <LinkComp
                                    ltype={link.type}
                                    lnotes={link.notes}
                                    lloc={link.address}
                                    key={link._id}
                                />
                            })}
                        </div>
                        <div className="high-box">
                            <p className="Disc textb"><strong>Discussion/Lab(s):</strong></p>
                            { disc.map((discussion) => {
                                return <DisComp 
                                    dday={discussion.days} 
                                    detime={discussion.etime} 
                                    dstime={discussion.stime}
                                    dtype={discussion.type} 
                                    key={discussion._id}
                                />
                            })}
                        </div>
                        <div className="high-box">
                            <p className="Prof textb"><strong>Professor(s): </strong></p>
                            { prof.map((prof) => {
                                return <PersonComp
                                pname={prof.name}
                                ptype={prof.position}
                                pemail={prof.email}
                                poh={prof.oh}
                                key={prof._id}
                                />
                            })}
                        </div>
                        <div className="high-box">
                            <p className="Prof textb"><strong>T.A.(s): </strong></p>
                            { ta.map((ta) => {
                                return <PersonComp
                                pname={ta.name}
                                ptype={ta.position}
                                pemail={ta.email}
                                poh={ta.oh}
                                key={ta._id}
                                />
                            })}
                        </div>
                        <div className="high-box">
                            <p className="assess textb"><strong>Assessment(s): </strong></p>
                            { test.map((test) => {
                                return <AssessComp
                                    ttype={test.type}
                                    tnotes={test.notes}
                                    tdate={test.date}
                                    key={test._id}
                                />
                            })}
                        </div>
                    </div>
                    <div className="bottomButtons">
                        <button onClick={courseClick} className="courses buutt">Back to Courses</button>
                        <button onClick={ EditClick }className="events buutt">Edit Course</button>
                    </div>
                </>
            )}
        </div>
    )
}