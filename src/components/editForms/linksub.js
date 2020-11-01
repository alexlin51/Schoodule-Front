import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function LinkSub(props) {   
    const [notes, setNotes] = useState(props.notes)
    const [type, setType] = useState(props.type)
    const [address, setAddress] = useState(props.address)

    useEffect(()=>{
        let repl = props.link
        repl[props.index] = {
            notes,
            type,
            address
        }
        props.setLink(repl)
    },[notes, type, address])

    const updateAddress = (event) => setAddress(event.target.value)
    const updateType = (event) => setType(event.target.value)
    const updateNotes = (event) => setNotes(event.target.value)

    const deleteLink = () => {
        let repl = props.updateInfo
        let list = repl.links
        list.splice(props.index, 1)
        repl.links = list
        props.setUpdateInfo(repl)
        props.setTemp(!props.temp)
    }

    useEffect(()=>{
        setAddress(props.address)
        setNotes(props.notes)
        setType(props.type)
    },[props.notes, props.address, props.type])

    return (
        <div>
            <div className='pBox2'>
                <p className="pBoxLab">Type:</p>
                <select onChange={updateType} value={type} className="drop limit">
                    <option value='link'>Link</option>
                    <option value='location'>Location</option>
                </select>
                <span className='pBoxLab'>Address/Link:</span>
                <input className="miniInput pad limit" type="text" onChange={updateAddress} value={address}></input>
                <span className='pBoxLab shift'>Notes:</span>
                <textarea className="miniInput2 limit" type="text" onChange={updateNotes} value={notes}></textarea>
                <button className="deleteOh personAdd" onClick={deleteLink}><FontAwesomeIcon className='deleteIcon' icon={faTrash}/></button>
            </div>
        </div>
    )
}