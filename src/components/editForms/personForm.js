import React, { useState, useEffect } from 'react';

import SubPerson from '../editForms/subPersonBox';
import AddPerson from '../editForms/addPerson';

import './edit.css';

export default function PersonForm(props) {
    // First thing I want to do is adjust the dataSet.
    const [oData, setOData] = useState(props.info);
    const [nData, setNData] = useState(props.updateInfo);
    const [person, setPerson] = useState(props.person);
    
    const [temp, setTemp] = useState(false);

    // This will update the Professor and Ta listing when creating this component and when the nData state is updated
    useEffect(()=>{
        if (person){
            // we need to generate a replicate dataset.
            let replicate = nData;
            
            let profList = nData.professor;

            // what if I implement a small buffer here
            setPerson([])

            for (let i = 0; i !== profList.length; i++){
                var ohList = profList[i].oh;
                let hourList = []
                for(let j = 0; j !== ohList.length; j++){
                    var ohModel = {
                        days: ohList[j].days,
                        stime: ohList[j].stime,
                        etime: ohList[j].etime,
                        notes: ohList[j].notes
                    }
                    hourList.push(ohModel)
                }
                
                let model = {
                    name: profList[i].name,
                    email: profList[i].email,
                    oh: hourList
                }

                replicate.professor[i] = model
            }

            let taList = nData.ta;

            for (let i = 0; i !== taList.length; i++){
                var ohList = taList[i].oh
                let hourList2 = []
                for(let j = 0; j !== ohList.length; j++){
                    var ohModel = {
                        days: ohList[j].days,
                        stime: ohList[j].stime,
                        etime: ohList[j].etime,
                        notes: ohList[j].notes
                    }
                    hourList2.push(ohModel)
                }

                let model = {
                    name: taList[i].name,
                    email: taList[i].email,
                    oh: hourList2
                }

                replicate.ta[i] = model
            }

            setNData(replicate)

            // update the person Array
            if(props.type === 'professor'){
                setPerson(replicate.professor)
            }
            else{
                setPerson(replicate.ta)
            }
        }
    }, [nData, person, temp, props.updateInfo])

    // When personList Is updated, push these updates to the newInfo
    useEffect(()=>{
        let replic = props.updateInfo;
        if(props.type === 'professor'){
            replic.professor = person;
            props.setUpdateInfo(replic)
        }else{
            replic.ta = person;
            props.setUpdateInfo(replic)
        }
    },[person])

    return (
        <div>
            <div className="entry">
                { (props.type === 'professor') ? (
                    <span className='labels'>Professor(s):</span>
                ):(
                    <span className='labels'>TA(s):</span>
                )}
                { person ? person.map((pers, index) => <SubPerson 
                    name={pers.name}
                    email={pers.email}
                    personList={person}
                    editPersonList={setPerson}
                    oh={pers.oh}
                    info={props.info}
                    setInfo={props.setInfo}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                    nData={nData}
                    setNData={setNData}
                    index={index}
                    key={index}
                    type={props.type}
                    
                    temp={temp}
                    setTemp={setTemp}
                />) : ''}
                <AddPerson
                    info={props.info}
                    setInfo={props.setInfo}
                    updateInfo={props.updateInfo}
                    setUpdateInfo={props.setUpdateInfo}
                    type={props.type}
                />
            </div>
        </div>
    )
}