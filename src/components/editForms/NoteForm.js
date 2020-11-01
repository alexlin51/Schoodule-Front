import React, { useState } from 'react';

import './edit.css';

export default function NoteForm(props) {
    const[notes, setNotes] = useState(props.notes)

    const update = (event) => {
        setNotes(event.target.value)

        let prevData = props.updateInfo;
        prevData.notes = event.target.value;

        props.setUpdateInfo(prevData)


    }

    let myNotes = props.notes;

    return (
        <div>
            <div className="entry">
                <span className='labels'>Notes:</span>
                <textarea onChange={update} className="notebox" value={notes} />
            </div>
        </div>
    )
}