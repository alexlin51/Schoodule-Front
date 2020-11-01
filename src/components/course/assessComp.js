import React, { useEffect, useState } from 'react';

import './comp.css';

export default function AssessComp(props) {
    const [type, setType] = useState('')

    useEffect(() => {
        if (props.ttype === "quiz"){
            setType("Quiz")
        }
        if (props.ttype === "midterm"){
            setType("Midterm")
        }
        if (props.ttype === "final"){
            setType("Final")
        }
    
    },[])
    
    return(
        <div>
            <div className="dbox">
                <p className="dinfo dtag">{type} </p>
                <p className="dinfo">Note: {props.tnotes}</p>
                <p className="dinfo">Date: {props.tdate}</p>
            </div>
        </div>
    )
} 
