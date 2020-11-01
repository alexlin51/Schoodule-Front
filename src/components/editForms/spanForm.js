import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import daySyntax from '../utils/todayFinder'

import './edit.css';

export default function SpanForm(props) {
    const [start, setStart] = useState(props.sdate);
    const [end, setEnd ] = useState(props.edate);

    const handleEvent = (event, picker ) =>{
        setStart(daySyntax(picker.startDate._d))
        setEnd(daySyntax(picker.endDate._d))
        
    }

    useEffect(()=>{
        let prevData = props.updateInfo;
        prevData.sdate = start;
        prevData.edate = end;

        props.setUpdateInfo(prevData)
    },[start, end])

    return (
        <div>
            <div className="entry">
                <span className='labels'>Course range:</span>
                <DateRangePicker
                    onEvent={handleEvent}
                    initialSettings={{ startDate: props.sdate, endDate: props.edate }}
                >
                    <input type="text" className="genericb" />
                </DateRangePicker>
            </div>
        </div>
    )
}