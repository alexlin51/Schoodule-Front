import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"


import TodoComp from '../todo/todoComp';

import './todoPage.css';

export default function ToDoPage(props) {
    const history = useHistory();

    const [type, setType] = useState();

    const [backup, setBackup] = useState({
        b_id:[],
        b_point:[],
        b_comp:[]
    })

    const [newEntry, setNewEntry] = useState('')
     
    const [id, setID] = useState('')
    const [name, setName] = useState('')

    const [load, setLoad] = useState(false)

    const [idList, setIdList] = useState([])
    const [pointList, setPointList] = useState([])
    const [compList, setCompList] = useState([])

    const [filter, setFilter] = useState('all')

    // load in the basic information for the different components
    useEffect(()=>{
        // I want to check logged in
        checkLoggedIn()

        let token = localStorage.getItem('auth-token');
        let id = props.match.params.id;
        let name = props.match.params.name;

        // I want to first verify if the id in the link is connected to a user.
        const verify = async (id) => {

            let answer = await Axios.post(
                'http://localhost:5000/events/check', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );

            if(!answer){
                // I want to send to dashboard
                history.push('/dashboard')
            }
                
        }

        verify(id)

        // then set the id and name
        setID(id)
        setName(name)

        // we want to generate and push the lists
        const pullData = async () => {
            let request = await Axios.post(
                'http://localhost:5000/todo/show', 
                { eventID: id }, 
                { headers: { 'X-Auth-Token': token } },
            );

            let todo = request.data.todo
            let type = request.data.type
            
            setType(type)

            let idArray = []
            let pointArray = []
            let compArray = []

    
            for(let i = (todo.length - 1) ; i != -1; i--){
                pointArray.push(todo[i].point)
                compArray.push(todo[i].finish)
                idArray.push(todo[i]._id)
            }
    
            setPointList(pointArray)
            setCompList(compArray)
            setIdList(idArray)
            setBackup({
                b_id: idArray,
                b_point: pointArray,
                b_comp: compArray
            })
        }

       pullData()
       setLoad(true)
    },[])

    const createNew = async () =>{
        setLoad(false)
        // This is where we want to add items
    
        // first test if things are empty
        if(newEntry === ""){
            window.alert("Empty entries are not able to be added.");
        }else{
            // we need to gather things
            let pack = {
                eventID : id,
                finish : false,
                point : newEntry
            }

            let request

            // try to send the info
            let token = localStorage.getItem('auth-token');
            try{
                request = await Axios.post(
                    'http://localhost:5000/todo/show/one', 
                    pack, 
                    { headers: { 'X-Auth-Token': token } },
                );
            } catch(err){
                console.log(err.message)
            }
            
            let l1 = pointList
            l1.unshift(newEntry)
            setPointList(l1)
            let l2 = compList
            l2.unshift(false)
            setCompList(l2)
            let l3 = idList
            l3.unshift(request.data.id)
            setIdList(l3)
            setNewEntry('')
        }
        setLoad(true)
    }

    const updateNew = (event) => {
        setNewEntry(event.target.value)
    }

    const enterKey = (event) =>{
        if (event.key === "Enter") {
            createNew()
        }
    }

    const [flip, setFlip] = useState(false)

    useEffect(()=>{
        console.log('detected')
    },[flip])

    useEffect(()=>{
        // we want to set the rest of the things according to backup
        if (filter === 'all'){
            // we want to directly set the backup
            setPointList(backup.b_point)
            setCompList(backup.b_comp)
            setIdList(backup.b_id)
        } else if (filter === 'unfin') {
            let ids = []
            let points = []
            let comps = []

            for(let i = 0; i != backup.b_id.length; i++){
                if(backup.b_comp[i] === false){
                    ids.push(backup.b_id[i])
                    points.push(backup.b_point[i])
                    comps.push(backup.b_comp[i])
                }
            }

            setPointList(points)
            setCompList(comps)
            setIdList(ids)
        } else if (filter === "fin") {
            let ids = []
            let points = []
            let comps = []

            for(let i = 0; i != backup.b_id.length; i++){
                if(backup.b_comp[i] === true){
                    ids.push(backup.b_id[i])
                    points.push(backup.b_point[i])
                    comps.push(backup.b_comp[i])
                }
            }

            setPointList(points)
            setCompList(comps)
            setIdList(ids)
        }
        setFlip(!flip)
    },[filter])

    const updateFilter = event => setFilter(event.target.value)

    const backevent = () =>{
        let url
        if (type === 'course'){
            url = `/dashboard/courses/show/${id}`
        }else{
            url = `/dashboard/events/show/${id}`
        }
        history.push(url)
    }

    return (
        <div>
            <div className="mainbox">
                <span className="titleTD">{name} | To Do List</span>
                <div className="divb"></div>
                <div className="newEntry">
                    <div className='inner'>
                        <span className="texxt">Add Todo</span>
                        <input onChange={updateNew} value={newEntry} onKeyPress={enterKey} className="input"></input>
                        <FontAwesomeIcon icon={faArrowRight} onClick={createNew} className="submiticon"/>
                    </div>
                    <select className="drop1" value={filter} onChange={updateFilter}>
                        <option value="all">All</option>
                        <option value="unfin">Unfinished</option>
                        <option value="fin">Completed</option>
                    </select>
                </div>
                 { load ? idList.map((info,index) => 
                    <TodoComp
                        flip={flip}
                        setFlip={setFlip}
                        idList={idList}
                        setIdList={setIdList}
                        pointList={pointList}
                        setPointList={setPointList}
                        compList={compList}
                        setCompList={setCompList}
                        backup={backup}
                        setBackup={setBackup}
                        index={index}
                        key={index}
                    />
                 ) : ''}
            </div>
            {(type === 'course') ? (
                <>
                    <button onClick={backevent} className="bottomB">Back to Course</button>
                </>
            ):(
                <>
                    <button onClick={backevent} className="bottomB">Back to Event</button>
                </>
            )}
        </div>
    )
}