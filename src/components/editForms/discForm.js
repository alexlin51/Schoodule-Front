import React, { useState, useEffect } from 'react';

import DiscSub from '../editForms/discSub'
import AddDisc from '../editForms/addDisc'

import './edit.css';

export default function DiscussionForm(props) {
    const [disc, setDisc] = useState(props.disc)

    const[temp, setTemp] = useState(false)

    useEffect(()=>{
        setDisc(props.disc)
    },[props.disc])

    useEffect(()=>{
        // I want to update all of the updated infomation with changes from my disc
        let repl = props.updateInfo
        repl.discussion = disc
        props.setUpdateInfo(repl)
    },[disc])

    return (
        <div>
            <div className="entry">
                <span className='labels'>Disc/Lab(s):</span>
                { disc ? disc.map((discc, index) => <DiscSub
                    type={discc.type}
                    days={discc.days}
                    stime={discc.stime}
                    etime={discc.etime}
                    index={index}
                    key={index}
                    disc={disc}
                    setDisc={setDisc}
                    temp={temp}
                    setTemp={setTemp}
                />):'' }
                <AddDisc
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