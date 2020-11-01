import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash,faCheck,faCircle } from "@fortawesome/free-solid-svg-icons"

import './todoComp.css';

export default function TodoComp(props) {
    const history = useHistory();

    // set up personal states
    const [myPoint, setMyPoint] = useState()
    const [editPoint, setEditPoint] = useState()
    const [myId, setMyId] = useState()
    const [myComp, setMyComp] = useState()

    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        let i = props.index

        setMyId(props.idList[i])
        setMyComp(props.compList[i])
        setEditPoint(props.pointList[i])
        setMyPoint(props.pointList[i])
    },[props.flip])

    useEffect(()=>{
        let i = props.index

        setMyId(props.idList[i])
        setMyComp(props.compList[i])
        setMyPoint(props.pointList[i])
        setEditPoint(props.pointList[i])
    },[])

    const deleteFunc = async () =>{
        // console.log(myPoint, myId, myComp)
        // let comps = props.compList
        // comps.splice(props.index, 1)
        // console.log(comps)
        // props.setCompList(comps)
        // let points = props.pointList
        // points.splice(props.index, 1)
        // console.log(points)
        // props.setPointList(points)
        // let ids = props.idList 
        // ids.splice(props.index, 1)
        // console.log(ids)
        // props.setIdList(ids)
        // props.setFlip(!props.flip)

        let pack = {
            id : myId,
        }

        let request
        let token = localStorage.getItem('auth-token');
        try{
            request = await Axios.post(
                'http://localhost:5000/todo/remove/one', 
                pack, 
                { headers: { 'X-Auth-Token': token } },
            );
        } catch (err){
            console.log(err.message)
        }

        // we need to update the backup
        let search = props.backup.b_id
        let holder = -1
        for (let j = 0; j != search.length; j++){
            if(search[j] === myId){
                holder = j
            }
        }

        // pull apart and splice
        search.splice(holder, 1)
        let searchPoint = props.backup.b_point
        searchPoint.splice(holder, 1)
        let searchComp = props.backup.b_comp
        searchComp.splice(holder, 1)

        props.setBackup({
            b_id: search,
            b_point: searchPoint,
            b_comp: searchComp
        })
        props.setFlip(!props.flip)
    }

    const finishFunc = async () =>{
        let token = localStorage.getItem('auth-token');
        setMyComp(!myComp)
        // we also need to make this change in the db
        
        let pack = {
            id: myId
        }

        let request
        try{
            request = await Axios.post(
                'http://localhost:5000/todo/swapfinish', 
                pack, 
                { headers: { 'X-Auth-Token': token } },
            );
        }catch(err){
            console.log(err.message)
        }

        // we need to update the backup
        let search = props.backup.b_id
        let holder = -1
        for (let j = 0; j != search.length; j++){
            if(search[j] === myId){
                holder = j
            }
        }

        // pull apart and flip
        let searchPoint = props.backup.b_point
        let searchComp = props.backup.b_comp
        searchComp[holder] = !searchComp[holder]

        props.setBackup({
            b_id: search,
            b_point: searchPoint,
            b_comp: searchComp
        })
        props.setFlip(!props.flip)
    }

    const saveNew = async () => {
        let token = localStorage.getItem('auth-token');

        // lets make js changes
        setMyPoint(editPoint)
        
        // we also need to make this change in the db
        let pack = {
            id: myId,
            point: editPoint
        }

        let request
        try{
            request = await Axios.post(
                'http://localhost:5000/todo/update/one', 
                pack, 
                { headers: { 'X-Auth-Token': token } },
            );
        }catch(err){
            console.log(err.message)
        }

        setEdit(!edit)

        // we need to update the backup
        let search = props.backup.b_id
        let holder = -1
        for (let j = 0; j != search.length; j++){
            if(search[j] === myId){
                holder = j
            }
        }

        // pull apart and flip
        let searchPoint = props.backup.b_point
        let searchComp = props.backup.b_comp
        searchPoint[holder] = editPoint

        props.setBackup({
            b_id: search,
            b_point: searchPoint,
            b_comp: searchComp
        })
        props.setFlip(!props.flip)
    }

    const updateEdit = (event) => {
        setEdit(!edit)
        setEditPoint(myPoint)
    }

    const updatePoint = event =>  setEditPoint(event.target.value)

    const enterKey = (event) =>{
        if (event.key === "Enter") {
            saveNew()
        }
    }

    return(
        <div>
            <div className={`todoBox ${myComp ? 'cross' : '' }`}>
                <div className="top">
                    <FontAwesomeIcon icon={faCircle} className="dot"/>
                    {edit ? (
                        <>
                            <input value={editPoint} onChange={updatePoint} onKeyPress={enterKey} className="inputty"></input>
                            <button className="savey" onClick={saveNew}>Save</button>
                        </>
                    ):(
                        <>
                            <span className={`todoPoint ${myComp ? 'strike' : '' }`}>{myPoint}</span>
                        </>
                    )}
                </div>
                <div>
                    <FontAwesomeIcon icon={faEdit} onClick={updateEdit} className={`todoicon ${edit ? "color" : ''}`}/>
                    <FontAwesomeIcon icon={faCheck} onClick={finishFunc} className="todoicon"/>
                    <FontAwesomeIcon icon={faTrash} onClick={deleteFunc} className="todoicon"/>
                </div>
            </div>  
        </div>
    )
} 

// we have access to name, color, and id