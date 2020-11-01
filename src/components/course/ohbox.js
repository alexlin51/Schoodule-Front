import React from 'react';
import dayEdit from '../utils/dayEdit';
import timeEdit from '../utils/timEdit';

import './comp.css';

export default function OhBox(props) {
    
    return(
        <div>
            <div className="dbox3">
                <div className="high-box">
                    <p className="dinfo oh" style={{paddingRight:"5px"}}>Note: </p>
                        <span className="dinfo oh">{props.onotes}</span>
                </div>
                <p className="dinfo oh">Day: {dayEdit(props.odays)}</p>
                <p className="dinfo oh">Times: {timeEdit(props.ostime)} - {timeEdit(props.oetime)}</p>
            </div>
        </div>
    )
} 
