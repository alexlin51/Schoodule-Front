import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function AddOhour(props) {
    
    const addEmptyOh = () => {
        let personList = null

        if(props.type === "professor"){
            personList = props.updateInfo.professor
        }else{
            personList = props.updateInfo.ta
        }

        // create the replicated and added Oh professor list
        let ohList = personList[props.index].oh
        let empty = {
            days: '',
            stime: '00:00',
            etime: '00:01',
            notes: ''
        }
        ohList.push(empty)
        personList[props.index].oh = ohList

        // generate the larger whole data set
        let newSet = {}

        if(props.type === "professor"){
            newSet = {
                name: props.updateInfo.name,
                color: props.updateInfo.color,
                sdate: props.updateInfo.sdate,
                edate: props.updateInfo.edate,
                stime: props.updateInfo.stime,
                days : props.updateInfo.days,
                etime: props.updateInfo.etime,
                notes: props.updateInfo.notes,
                discussion: props.updateInfo.discussion,
                professor: personList,
                ta: props.updateInfo.ta,
                assess: props.updateInfo.assess,
                links: props.updateInfo.links,
            }
        }else{
            newSet = {
                name: props.updateInfo.name,
                color: props.updateInfo.color,
                sdate: props.updateInfo.sdate,
                edate: props.updateInfo.edate,
                days : props.updateInfo.days,
                stime: props.updateInfo.stime,
                etime: props.updateInfo.etime,
                notes: props.updateInfo.notes,
                discussion: props.updateInfo.discussion,
                professor: props.updateInfo.professor,
                ta: personList,
                assess: props.updateInfo.assess,
                links: props.updateInfo.links,
            }
        }

        // push the changes
        props.setUpdateInfo(newSet)
        props.setTemp(!props.temp)
    }

    return (
        <div>
            <a className="plus-wrap2" onClick={addEmptyOh}>
                <FontAwesomeIcon icon={faPlusSquare} className="plus2"/>
            </a>
        </div>
    )

}