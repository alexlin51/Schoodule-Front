import React, {useEffect, useState} from 'react';
import TimePicker from 'react-time-picker';
import timeCompare from '../utils/timeCompare';
import parseDayString from '../utils/parseDayString';
import sortDays from '../utils/sortDays';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import './edit.css';

export default function OhBox(props) {
    // Coloring for the Time boxes
    const [myError, setMyError] = useState(false)

    // General Info State
    const [start, setStart ] = useState(props.stime)
    const [end, setEnd ] = useState(props.etime)
    const [dayArray, setDayArray] = useState([]);
    const [notes, setNotes] = useState(props.notes)

    // States for the Days
    const [M, setM] = useState(false);
    const [T, setT] = useState(false);
    const [W, setW] = useState(false);
    const [Th, setTh] = useState(false);
    const [F, setF] = useState(false);
    const [Sat, setSat] = useState(false);
    const [Sun, setSun] = useState(false);

    // Populates the Day Array when first Loading in
    useEffect(()=>{
        let OldArray = parseDayString(props.days);

        // update
        for (let i = 0; i !== OldArray.length; i++){
            if(OldArray[i] === "M"){
                setM(true)
            }
            if(OldArray[i] === "T"){
                setT(true)
            }
            if(OldArray[i] === "W"){
                setW(true)
            }
            if(OldArray[i] === "Th"){
                setTh(true)
            }
            if(OldArray[i] === "F"){
                setF(true)
            }
            if(OldArray[i] === "Sat"){
                setSat(true)
            }
            if(OldArray[i] === "Sun"){
                setSun(true)
            }
        }
    }, [props.days])
    
    // Checks for errors when updaing the times.
    useEffect(()=>{
        // when there is an update, we want to run checks on these times
        if (timeCompare(start, end)){
            setMyError(true)
        } 
        else{
            setMyError(false)
            // we can update the data here.
        }
    },[start, end])

    // Watches and Updates the Day Options
    useEffect(()=>{
        // we want to update the array every time
        let array = dayArray
        if(M === true){
            if(!array.includes('M')){
                array.push('M')
            }
        }else{
            if(array.includes('M')){
                array = array.filter(day => day !== 'M')
            }
        }
        if(T === true){
            if(!array.includes('T')){
                array.push('T')
            }
        }else{
            if(array.includes('T')){
                array = array.filter(day => day !== 'T')
            }
        }
        if(W === true){
            if(!array.includes('W')){
                array.push('W')
            }
        }else{
            if(array.includes('W')){
                array = array.filter(day => day !== 'W')
            }
        }
        if(Th === true){
            if(!array.includes('Th')){
                array.push('Th')
            }
        }else{
            if(array.includes('Th')){
                array = array.filter(day => day !== 'Th')
            }
        }
        if(F === true){
            if(!array.includes('F')){
                array.push('F')
            }
        }else{
            if(array.includes('F')){
                array = array.filter(day => day !== 'F')
            }
        }
        if(Sat === true){
            if(!array.includes('Sat')){
                array.push('Sat')
            }
        }else{
            if(array.includes('Sat')){
                array = array.filter(day => day !== 'Sat')
            }
        }if(Sun === true){
            if(!array.includes('Sun')){
                array.push('Sun')
            }
        }else{
            if(array.includes('Sun')){
                array = array.filter(day => day !== 'Sun')
            }
        }
        array = sortDays(array)
        setDayArray(array)
    }, [M,T,W,Th,F,Sat,Sun])

    // Main Updater that will update the Ohs for the parent Person
    useEffect(()=>{
        let ohRepl = []
        for(let i = 0 ; i !== props.oh.length; i++){
            ohRepl.push(props.oh[i])
        }

        let model = {
            notes,
            stime: start,
            etime: end,
            days: dayArray.toString()
        } 

        ohRepl[props.index] = model
        props.editOh(ohRepl)
        
    }, [start, end, dayArray, notes, M, T, W, Th, F, Sat, Sun])

    const deleteOh = () => {
        let ohRepl = props.oh
    
        // reset all
        setM(false)
        setT(false)
        setW(false)
        setTh(false)
        setF(false)
        setSat(false)
        setSun(false)

        ohRepl.splice(props.index, 1)
        props.editOh(ohRepl)
        props.setTemp3(!props.temp3)
    }

    useEffect(()=>{
        setStart(props.stime)
        setEnd(props.etime)
        setNotes(props.notes)

    },[props.stime, props.etime, props.notes])

    // Document Updates to the State
    const updateNotes = event => setNotes(event.target.value)
    const updateTime1 = time => setStart(time)
    const updateTime2 = time => setEnd(time)
    const checkM = event => setM(!M)
    const checkT = event => setT(!T)
    const checkW = event => setW(!W)
    const checkTh = event => setTh(!Th)
    const checkF = event => setF(!F)
    const checkSat = event => setSat(!Sat)
    const checkSun = event => setSun(!Sun)

    return (
        <div>
            <div className="ohSubBox">
                <p className="pBoxLab">Notes:</p>
                <textarea className="miniInput2" type="text" onChange={updateNotes} value={notes}></textarea>
                <p className="pBoxLab">Start Time:</p>
                <TimePicker 
                    className={`timeBox ${myError ? "timeBoxError" : ""}`}
                    onChange={updateTime1}
                    value={props.stime}
                />
                <p className="pBoxLab">End Time:</p>
                <TimePicker 
                    className={`timeBox ${myError ? "timeBoxError" : ""}`}
                    onChange={updateTime2}
                    value={props.etime}
                />
                <p className="pBoxLab extra-bottompadding">Days:</p>
                <fieldset>
                    <input className='radio' onChange={checkM} checked={M} type="checkbox" value="M"/><span className='rlabels'> M</span>
                    <input className='radio' onChange={checkT} checked={T} type="checkbox" value="T"/><span className='rlabels'> T</span>
                    <input className='radio' onChange={checkW} checked={W} type="checkbox" value="W"/><span className='rlabels'> W</span>
                    <input className='radio' onChange={checkTh} checked={Th} type="checkbox" value="Th"/><span className='rlabels'> Th</span>
                </fieldset>
                <br></br>
                <fieldset>
                    <input className='radio' onChange={checkF} checked={F} type="checkbox" value="F"/><span className='rlabels'> F</span>
                    <input className='radio' onChange={checkSat} checked={Sat} type="checkbox" value="Sat"/><span className='rlabels'> Sat</span>
                    <input className='radio' onChange={checkSun} checked={Sun} type="checkbox" value="Sun"/><span className='rlabels'> Sun</span>
                </fieldset>
                <button className="deleteOh" onClick={deleteOh}><FontAwesomeIcon className='deleteIcon' icon={faTrash}/></button>
           </div>
        </div>
    )
}