import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function AddLink(props) {

    // I need to update the lists.
    const addLink = () => {
        let empty = {
            notes: '',
            type: 'link',
            address: ''
        }

        let repl = props.updateInfo
        let linkList = repl.links
        linkList.push(empty)
        repl.links = linkList
        props.setUpdateInfo(repl)
        props.setTemp(!props.temp)
    }

    return (
        <div>
            <a className="plus-wrap" onClick={addLink}>
                <FontAwesomeIcon icon={faPlusSquare} className="plus"/>
            </a>
        </div>
    )
}