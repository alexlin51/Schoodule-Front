import React from 'react';

import './edit.css';

export default function NameForm(props) {

    const update = (event) => {
        props.setName(event.target.value)

        // I think I want to update the General info here
        let prevData = props.updateInfo;
        prevData.name = event.target.value;

        props.setUpdateInfo(prevData)


    }

    return (
        <div>
            <div className="entry">
                <span className='labels'>Course Name:</span>
                <input onChange={update} type='text' className="genericb" value={props.name}></input>
            </div>
        </div>
    )
}