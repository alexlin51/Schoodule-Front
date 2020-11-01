import React, { useEffect, useState } from 'react';

import OhBox from './ohbox'

import './comp.css';

export default function PersonComp(props) {
    const [surname, setSurname] = useState('')
    const [oh, setoh] = useState([])

    useEffect(() => {
        if (props.ptype === "professor"){
            setSurname('Professor ')
        }
        if (props.ptype === "ta"){
            setSurname('T.A.- ')
        }

        setoh(props.poh)
    
    },[])

    return(
        <div>
            <div className='dbox2'>
                <p className='dinfo'>{surname} {props.pname}</p>
                <p className='dinfo'>Email: {props.pemail}</p>
                <div className="high-box">
                    <p className="Disc dinfo" style={{paddingRight:"5px"}}>Office Hours:</p>
                    { oh.map((ohour) => {
                        return <OhBox
                            onotes={ohour.notes}
                            odays={ohour.days}
                            oetime={ohour.etime}
                            ostime={ohour.stime}
                            key={ohour._id}
                        />
                    })}
                </div>
            </div>
        </div>
    )
} 


