import React from 'react';

import NameForm from '../editForms/nameForm';
import NoteForm from '../editForms/NoteForm';
import SpanForm from '../editForms/spanForm';
import TimeForm from '../editForms/timeForm';
import DayForm from '../editForms/dayform';
import ColorForm from '../editForms/colorForm';
import LinkForm from '../editForms/linkForm';

import '../course/CEditHolder.css';

export default function EventHolder(props) {
    return (
        <div>
           <div className="FormsCon">
                <NameForm 
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                    name={props.name}
                    setName={props.setName}
                />
                <NoteForm
                    notes={props.info.notes}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                />
                <SpanForm
                    sdate={props.info.sdate}
                    edate={props.info.edate}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                />
                <TimeForm
                    stime={props.info.stime}
                    etime={props.info.etime}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                    error1={props.error1}
                    setError1={props.setError1}
                />
                <DayForm
                    days={props.info.days}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                />
                <ColorForm
                    color={props.info.color}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                />
                <LinkForm
                    info={props.info}
                    setInfo={props.setInfo}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                />
           </div>
        </div>
    )
}

    