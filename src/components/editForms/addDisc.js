import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function AddDisc(props) {

    // I need to update the lists.
    const AddDisc = () => {
        let empty = {
            days: '',
            stime:'00:00',
            etime: '00:01',
            type: 'discussion'
        }

        let repl = props.updateInfo
        let list = repl.discussion
        if (list){
            list.push(empty)
        } else{
            list = [
                empty
            ]
        }
        repl.discussion = list
        props.setUpdateInfo(repl)
        props.setTemp(!props.temp)
    }

    return (
        <div>
            <a className="plus-wrap" onClick={AddDisc}>
                <FontAwesomeIcon icon={faPlusSquare} className="plus"/>
            </a>
        </div>
    )
}