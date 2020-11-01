import React, {useEffect, useState} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function SubAssessBox(props) {
    const [date, setDate] = useState(props.date)
    const [type, setType] = useState(props.type)
    const [notes, setNotes] = useState(props.notes)

    const updateType = (event) => setType(event.target.value)
    const updateNotes = (event) => setNotes(event.target.value)
    const updateDate = (event) => {
      setDate(event.target.value)
    }

    useEffect(()=>{
        // I want to compile this stuff and send to test
        let repl = props.updateInfo.assess
        repl[props.index] = {
            date,
            type,
            notes
        } 
        //props.setAssess(repl)
    },[date, type, notes])

    const deleteLink = () => {
        let repl = props.updateInfo
        let list = repl.assess
        list.splice(props.index, 1)
        repl.assess = list
        props.setUpdateInfo(repl)
        props.setTemp(!props.temp)
    }

    useEffect(()=>{
        setDate(props.date)
        setNotes(props.notes)
        setType(props.type)
    },[props.notes, props.date, props.type])

    return (
        <div>
            <div className="pBox2">
                <p className="pBoxLab">Type:</p>
                <select onChange={updateType} value={type} className="drop limit">
                    <option value='quiz'>Quiz</option>
                    <option value='midterm'>Midterm</option>
                    <option value='final'>Final</option>
                </select>
                <span className='pBoxLab shift'>Notes:</span>
                <textarea className="miniInput2 limit" type="text" onChange={updateNotes} value={notes}></textarea>
                <span className='pBoxLab'>Date:</span>
                <DateRangePicker
                    initialSettings={{ singleDatePicker:true, startDate: date }}
                    onEvent={updateDate}
                >
                    <input className="miniInput pad limit" type="text" ></input>
                </DateRangePicker>
                <button className="deleteOh personAdd" onClick={deleteLink}><FontAwesomeIcon className='deleteIcon' icon={faTrash}/></button>
            </div>
        </div>
    )
}