import React from 'react';
import daySyntax from '../utils/todayFinder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function AddAssess(props) {

    // I need to update the lists.
    const addAssess = () => {
        var currentTime = new Date();
        let repl = props.updateInfo
        let list = repl.assess
        list.push({
            date: daySyntax(currentTime),
            notes: '',
            type: 'quiz'
        })
        repl.assess = list
        props.setUpdateInfo(repl)
        props.setTemp(!props.temp)
        
    }

    return (
        <div>
            <a className="plus-wrap" onClick={addAssess}>
                <FontAwesomeIcon icon={faPlusSquare} className="plus"/>
            </a>
        </div>
    )
}