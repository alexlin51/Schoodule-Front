import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

import './footer.css'

export default function Footer() {
    const history = useHistory();

    const feedbackLink = () => {
        window.open('https://forms.gle/G1JeL8fU7QLCBqJu5', '_blank');
    }

    return (
        <div className="foot">
            <div className="round" onClick={feedbackLink}>
                <FontAwesomeIcon className='feed' icon={faCommentAlt}/>
                <span className='feedback'>Got feedback?</span>
            </div>
        </div>
    )
}
