import React, { useEffect, useState } from 'react';
import parseDayString from '../utils/parseDayString';
import sortDays from '../utils/sortDays';

import './edit.css';

export default function DayForm(props) {
    const [day, setDay] = useState(props.days);
    const [dayArray, setDayArray] = useState([]);
    const [M, setM] = useState(false);
    const [T, setT] = useState(false);
    const [W, setW] = useState(false);
    const [Th, setTh] = useState(false);
    const [F, setF] = useState(false);
    const [Sat, setSat] = useState(false);
    const [Sun, setSun] = useState(false);

    useEffect(() => {
        // we want to parse the setday into an array
        let OldArray = parseDayString(day);
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

    },[])

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

    useEffect(() =>{
        let prevData = props.updateInfo
        prevData.days = dayArray.toString()
        props.setUpdateInfo(prevData)
    },[M,T,W,Th,F,Sat,Sun])

    useEffect(()=>{
        let prevData = props.updateInfo
        prevData.days = dayArray.toString()
        props.setUpdateInfo(prevData)
    },[dayArray])


    const checkM = event => setM(!M)
    const checkT = event => setT(!T)
    const checkW = event => setW(!W)
    const checkTh = event => setTh(!Th)
    const checkF = event => setF(!F)
    const checkSat = event => setSat(!Sat)
    const checkSun = event => setSun(!Sun)

    return (
        <div>
            <div className="entry">
                <span className='labels'>Course Day(s):</span>
                <fieldset>
                    <input className='radio' onChange={checkM} checked={M} type="checkbox" value="M"/><span className='rlabels'> Mon</span>
                    <input className='radio' onChange={checkT} checked={T} type="checkbox" value="T"/><span className='rlabels'> Tues</span>
                    <input className='radio' onChange={checkW} checked={W} type="checkbox" value="W"/><span className='rlabels'> Wed</span>
                    <input className='radio' onChange={checkTh} checked={Th} type="checkbox" value="Th"/><span className='rlabels'> Thurs</span>
                    <input className='radio' onChange={checkF} checked={F} type="checkbox" value="F"/><span className='rlabels'> Fri</span>
                    <input className='radio' onChange={checkSat} checked={Sat} type="checkbox" value="Sat"/><span className='rlabels'> Sat</span>
                    <input className='radio' onChange={checkSun} checked={Sun} type="checkbox" value="Sun"/><span className='rlabels'> Sun</span>
                </fieldset>
            </div>
        </div>
    )
}