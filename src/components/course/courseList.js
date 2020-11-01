import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEdit } from "@fortawesome/free-solid-svg-icons"
import React from 'react';
import { useHistory } from 'react-router-dom';

import './courseForm.css';

export default function CourseList(props) {
    const history = useHistory();

    const courseLink = () => {
        if (props.type === "course"){
            history.push(`/dashboard/courses/show/${props.id}`)
        } else if (props.type === 'event'){
            history.push(`/dashboard/events/show/${props.id}`)
        }
    }

    const editLink = () => {
        let urlLink = ''
        if (props.type === "course"){
            urlLink = `/dashboard/courses/edit/${props.id}`
        } else if (props.type === 'event'){
            urlLink = `/dashboard/events/edit/${props.id}`
        }
        history.push(urlLink)
    }

    return(
        <div>
            <div className="label">
                <div className="leftside">
                    <FontAwesomeIcon icon={faCircle} style={{color: props.color}} className="dot"/>
                    <a onClick={courseLink} className="tags"><p className="cName">{props.name}</p></a>
                </div>
                    <a onClick={ editLink }><FontAwesomeIcon icon={faEdit} className="edit"/></a>
            </div>
        </div>
    )
} 

// we have access to name, color, and id
