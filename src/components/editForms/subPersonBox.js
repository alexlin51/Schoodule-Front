import React, { useEffect, useState } from 'react';

import OhBox from '../editForms/ohBox';
import AddOhour from '../editForms/addOhour';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function SubPerson(props) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [oh, setOh] = useState(props.oh);
    const [temp2, setTemp2] = useState(false);
    const [temp3, setTemp3] = useState(false);

    // This will update to the updated Data set
    useEffect(()=>{
        // we can always fix the format of the PersonList Data coming
        let model = {
            name,
            email,
            oh
        };
        let replPersList = props.personList;
        replPersList[props.index] = model;
        props.editPersonList(replPersList)
    },[oh, name, email, props.name, props.email, props.oh])

    const updateName = (event) => {
        setName(event.target.value)
    };

    const updateEmail = (event) => {
        setEmail(event.target.value)
    };

    const deletePerson = () => {
        // we want to delete the person with the index
        let personList = null
        if(props.type === "professor"){
            personList = props.updateInfo.professor
        }else{
            personList = props.updateInfo.ta
        }
        personList.splice(props.index, 1)
        let wholeSet = props.updateInfo
        if(props.type === "professor"){
            wholeSet.professor = personList
        }else{
            wholeSet.ta = personList
        }

        props.setUpdateInfo(wholeSet)
        props.setTemp(!props.temp)
    }

    useEffect(()=>{
        setName(props.name)
        setEmail(props.email)
        setOh(props.oh)
    },[props.name, props.email, props.oh])

    return (
        <div>
            <div className="pBox">
                <p className="pBoxLab">Name: <span style={{color: "lightslategray"}}>(No need to add prefix!)</span></p>
                <input className="miniInput" type="text" onChange={updateName} value={name}></input>
                <p className="pBoxLab">Email: </p>
                <input className="miniInput" type="text" onChange={updateEmail} value={email}></input>
                <div className="entry">
                    <p className="pBoxLab">OH:</p>
                    { oh.map((hour, index)=> <OhBox
                        days={hour.days}
                        stime={hour.stime}
                        etime={hour.etime}
                        notes={hour.notes}
                        oh={oh}
                        editOh={setOh}
                        info={props.info}
                        setInfo={props.setInfo}
                        updateInfo={props.updateInfo}
                        setUpdateInfo={props.setUpdateInfo}
                        index={index}
                        key={index}

                        temp3={temp3}
                        setTemp3={setTemp3}
                    />)}
                    <AddOhour
                        info={props.info}
                        setInfo={props.setInfo}
                        updateInfo={props.updateInfo}
                        setUpdateInfo={props.setUpdateInfo}
                        index={props.index}
                        type={props.type}

                        temp={temp2}
                        setTemp={setTemp2}
                    />
                </div>
                <button className="deleteOh personAdd" onClick={deletePerson}><FontAwesomeIcon className='deleteIcon' icon={faTrash}/></button>
            </div>
        </div>
    )
}