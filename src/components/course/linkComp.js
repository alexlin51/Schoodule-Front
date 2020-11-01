import React, {useEffect, useState} from 'react';
// import dayEdit from '../utils/dayEdit';
// import timeEdit from '../utils/timEdit';
// import { useHistory } from 'react-router-dom';

import './comp.css';

export default function LinkComp(props) {
    const [myUrl, setUrl] = useState('')

    useEffect(() => {
        if (props.ltype === "link"){
            let url = props.lloc
            if (!url.includes("https://")){
                let newS = 'https://'
                newS = newS.concat(props.lloc)
                setUrl(newS)
            }else{
                setUrl(props.lloc)
            }
        }
    
    },[])

    return(
        <div>
            <div className="dbox">
                <div className="lnotes">
                    <p className='dinfo' style={{paddingRight: '5px'}}>Note: </p>
                    <span>{props.lnotes}</span>
                </div>
                {(props.ltype === "location") ? (
                    <>
                        <div className="lnotes">
                            <p className="dinfo" style={{paddingRight: '5px'}}>Address: </p>
                            <span className="llk" >{props.lloc}</span>
                        </div>
                    </>
                ):(<></>)}
                {(props.ltype === "link") ? (
                    <>
                        <div className="lnotes">
                            <p className="dinfo" style={{paddingRight: '5px'}}>Link: </p>
                            <a href={myUrl} className="llk" target="_blank" rel="noopener noreferrer">{myUrl}</a>
                        </div>
                    </>
                ):(<></>)}
            </div>
        </div>
    )
} 

