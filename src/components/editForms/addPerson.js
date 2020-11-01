import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function AddPerson(props) {

    // I need to update the lists.
    const addEmptyPerson = () => {
        let updatePerson = null

        if(props.type === "professor"){
            updatePerson = props.updateInfo.professor;
        }else{
            updatePerson = props.updateInfo.ta;
        }

        let updateOne = {
            name: '',
            email: '',
            oh: []
        }

        updatePerson.push(updateOne)

        var newUpdate = {}
    
        if(props.type === "professor"){
            newUpdate = {
                name: props.updateInfo.name,
                color: props.updateInfo.color,
                sdate: props.updateInfo.sdate,
                edate: props.updateInfo.edate,
                stime: props.updateInfo.stime,
                days : props.updateInfo.days,
                etime: props.updateInfo.etime,
                notes: props.updateInfo.notes,
                discussion: props.updateInfo.discussion,
                professor: updatePerson,
                ta: props.updateInfo.ta,
                assess: props.updateInfo.assess,
                links: props.updateInfo.links,
            }
        }else{
            newUpdate = {
                name: props.updateInfo.name,
                color: props.updateInfo.color,
                sdate: props.updateInfo.sdate,
                etime: props.updateInfo.etime,
                days : props.updateInfo.days,
                edate: props.updateInfo.edate,
                stime: props.updateInfo.stime,
                notes: props.updateInfo.notes,
                discussion: props.updateInfo.discussion,
                professor: props.updateInfo.professor,
                ta: updatePerson,
                assess: props.updateInfo.assess,
                links: props.updateInfo.links,
            }
        }

        props.setUpdateInfo(newUpdate)
    }

    return (
        <div>
            <a className="plus-wrap" onClick={addEmptyPerson}>
                <FontAwesomeIcon icon={faPlusSquare} className="plus"/>
            </a>
        </div>
    )
}