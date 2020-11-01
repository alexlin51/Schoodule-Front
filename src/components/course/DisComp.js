import React from 'react';
import dayEdit from '../utils/dayEdit';
import timeEdit from '../utils/timEdit';
// import { useHistory } from 'react-router-dom';

import './comp.css';

export default function DisComp(props) {

    return(
        <div>
            <div className="dbox">
                { (props.dtype === "discussion") ? <p className="dinfo dtag">Discussion </p> : <></>}
                { (props.dtype === "lab") ? <p className="dinfo dtag">Lab </p> : <></>}
                <p className="dinfo">Days: {dayEdit(props.dday)}</p>
                <p className="dinfo">Time: {timeEdit(props.dstime)} - {timeEdit(props.detime)}</p>
            </div>
        </div>
    )
} 


