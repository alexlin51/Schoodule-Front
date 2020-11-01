import React, { useState, useEffect } from 'react';

import LinkSub from '../editForms/linksub';
import AddLink from '../editForms/addLink';

import './edit.css';

export default function LinkForm(props) {
    const [link, setLink] = useState(props.updateInfo.links)

    const[temp, setTemp] = useState(false)
    const[temp2, setTemp2] = useState(false)

    useEffect(()=>{
        setLink(props.updateInfo.links)
    },[temp])

    useEffect(()=>{
        let repl = props.updateInfo
        repl.links = link
        props.setUpdateInfo(repl)
    },[link])

    return (
        <div>
            <div className="entry">
                <span className='labels'>Location/Link(s):</span>
                { link ? link.map((links, index)=> <LinkSub
                    notes={links.notes}
                    type={links.type}
                    address={links.address}
                    index={index}
                    key={index}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}

                    link={link}
                    setLink={setLink}
                    temp={temp2}
                    setTemp={setTemp2}
                />): ''}
                <AddLink
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