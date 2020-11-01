import React, {useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import SubAssessBox from '../editForms/assessBox'
import AddAssess from '../editForms/addAssess';

import './edit.css';

export default function AssessBox(props) {
    const [assess, setAssess] = useState(props.updateInfo.assess)

    const[temp, setTemp] = useState(false)
    const[temp2, setTemp2] = useState(false)

    useEffect(()=>{
        setAssess(props.updateInfo.assess)
    },[temp])

    useEffect(()=>{
        let repl = props.updateInfo
        repl.assess = assess
        props.setUpdateInfo(repl)
    },[assess])

    return (
        <div>
            <div className="entry">
                <span className='labels'>Assessment(s):</span>
                { assess ? assess.map((test,index) => <SubAssessBox
                    date={test.date}
                    type={test.type}
                    notes={test.notes}
                    index={index}
                    key={index}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}

                    assess={assess}
                    setAssess={setAssess}
                    temp={temp2}
                    setTemp={setTemp2}
                />): ''}
                <AddAssess
                    info={props.info}
                    setInfo={props.setInfo}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}

                    temp={temp}
                    setTemp={setTemp}
                />
            </div>
        </div>
    )
}