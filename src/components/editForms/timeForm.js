import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import timeCompare from '../utils/timeCompare';

import './edit.css';

export default function TimeForm(props) {
    const [start, setStart ] = useState(props.stime)
    const [end, setEnd ] = useState(props.etime)
    const [myError, setMyError] = useState(props.error1)

    useEffect(()=>{
        // when there is an update, we want to run checks on these times
        if (timeCompare(start, end)){
            props.setError1(true)
            setMyError(true)
        } else{
            props.setError1(false)
            setMyError(false)
        }
        
        let prevData = props.updateInfo;
        prevData.stime = start;
        prevData.etime = end;
        props.setUpdateInfo(prevData)
        

    }, [start, end])

    const update1 = time => setStart(time)
    const update2 = time => setEnd(time)

    return (
        <div>
            <div className="entry">
                <span className='labels'>Course time: </span>
                <TimePicker 
                    className={`timeBox ${myError ? "timeBoxError" : ""}`}
                    onChange={update1}
                    value={start}
                />
                <span className='btwn'> to </span>
                <TimePicker 
                    className={`timeBox ${myError ? "timeBoxError" : ""}`}
                    onChange={update2}
                    value={end}
                />
            </div>
        </div>
    )
}