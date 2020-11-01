import React from 'react';
import ReactColorPicker from '@super-effective/react-color-picker';

import './edit.css';

export default function ColorForm(props) {

    const update = (color) => {
        // I think I want to update the General info here
        let prevData = props.updateInfo;
        prevData.color = color;

        props.setUpdateInfo(prevData)
    }

    return (
        <div>
            <div className="entry">
                <span className='labels'>Course Color:</span>
                <div className="colorBox">
                    <ReactColorPicker 
                        color={props.color}
                        onChange={update}
                    />
                </div>
            </div>
        </div>
    )
}