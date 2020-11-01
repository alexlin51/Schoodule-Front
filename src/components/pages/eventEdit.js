import React, { useEffect, useState }from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import checkLoggedIn from '../auth/checkauth';

// Import Holder of events componenets
import EventHolder from '../editEventForms/EventHolder';

// Utils
import eventCheck from '../utils/dataCheck';
import timeCompare from '../utils/timeCompare';

import '../course/CEditHolder.css';

export default function EventEdit(props) {
    const history = useHistory();

    const [finish, setFinish] = useState(false)
    const [access, setAccess] = useState(true)
    const [load, setLoad] = useState(true)

    const [name, setName] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [updateData, setUpdateData] = useState([])

    const [error1, setError1] = useState(false) // Span

    const [button, setButton] = useState(false)
    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)


    useEffect(() =>{

        //protect against people not logged in.    
        checkLoggedIn();

        let token = localStorage.getItem('auth-token');
        let id = props.match.params.id;

        // I want to first verify if the id in the link is connected to a user.
        const verify = async (id) => {

            let answer = await Axios.post(
                'http://localhost:5000/events/check', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );

            if(answer){
                if(answer.data === true){
                    setAccess(true)
                }else{
                    setAccess(false)
                }
            }else{
                setAccess(false)
            }
        }

        verify(id)

        // now I want to pull the real data
        const pull = async(id) => {
            const data = await Axios.post(
                'http://localhost:5000/events/grab', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );
            
            setName(data.data.name)
            setData(data.data)
            setUpdateData(data.data)
            setLoad(false)
        }


        pull(id);
        setId(id);
    },[])


    const cancelClick = () => {
        setButton(true)
        let curlLink = `/dashboard/events/show/${id}`
        history.push(curlLink)
    }

    const deleteClick = async () => {
        setButton1(true)
        // DETELTING ACTION HERE
        let token = localStorage.getItem('auth-token');

        const deleteData = async (id) => {
            const data = await Axios.post(
                'http://localhost:5000/events/delete', 
                { event: id }, 
                { headers: { 'X-Auth-Token': token } },
            );
                
        }

        await deleteData(id)


        let curlLink = `/dashboard/events`
        history.push(curlLink)
        setButton1(false)
    }

    const saveClick = async () => {
        setButton2(true)
        // THERE WILL BE ALOT OF DATA COMPILATION AND TRANSFER HERE.

        // I want to build a fucntion to check the times and if there is an error there. 
        // Will return true or false, if false, send error, if true, go ahead and run update procedures.
        // true is bad cuz there is an issue
        let issue = timeCompare(updateData.stime, updateData.etime)
        let token = localStorage.getItem('auth-token');

        if(issue){
            window.alert('Error: Ensure that time entries are ordered and valid. Note that boxes should appear red if an issue is detected.')
        }else{
            // first we want to compile a list of all todos
            let todos = []
        
            const populateTodo = async () => {
                const data = await Axios.post(
                    'http://localhost:5000/todo/show', 
                    { eventID: id }, 
                    { headers: { 'X-Auth-Token': token } },
                );
                return data.data.todo
            } 

            todos = await populateTodo()
            // we want to run the update procedure here.

            // first we delete the entry with this id and then we create a new one like this.
            // now I want to pull the real data
            const deleteData = async (id) => {
                const data = await Axios.post(
                    'http://localhost:5000/events/delete', 
                    { event: id }, 
                    { headers: { 'X-Auth-Token': token } },
                );
                    
            }

            const createData = async () => {
                const data = await Axios.post(
                    'http://localhost:5000/events/push', 
                    updateData, 
                    { headers: { 'X-Auth-Token': token } },
                );
                
                return data.data.id
            }

            let createdID = ''
            try{
                createdID = await createData()
                console.log(createdID)
                await deleteData(id)
            } catch(err){
                console.log(err.message)
            }
            
            // we want to update all the entries in the todo with new id
            for (let i = 0; i != todos.length; i++){
                todos[i].eventID = createdID
            }

            // delete previous todos under old id
            const deleteOldTodo = async () => {
                const data = await Axios.post(
                    'http://localhost:5000/todo/delete', 
                    { eventID: id }, 
                    { headers: { 'X-Auth-Token': token } },
                );
            
            } 

            await deleteOldTodo()

            let pack = {
                eventID: createdID,
                todo: todos
            }

            // reimplement new todo under new id
            const newTodo = async () => {
                const data = await Axios.post(
                    'http://localhost:5000/todo/push', 
                    pack, 
                    { headers: { 'X-Auth-Token': token } },
                );
            
            } 

            await newTodo()


            let curlLink = `/dashboard/events/show/${createdID}`
            history.push(curlLink)
        }
        setButton2(false)
    }

    const show = () => {
        console.log(updateData)
        console.log(data)
    }

    return (
        <div>
            { (load) ? (
                <>
                    <div className="lbox">
                        { !access && finish ? (
                            <p className='ltext'>Event not found</p>
                        ):(
                            <p className='ltext'>Loading event...</p>
                        ) }
                    </div>               
                </>
            ):(
                <>
                    <div className="ccontainer"> 
                        <h1 className="ctext">Editing | {name}</h1>
                        <div className="divb"></div>
                        <EventHolder 
                            id={id}
                            info={data} 
                            setInfo={setData}
                            updateInfo={updateData}
                            setUpdateInfo={setUpdateData}
                            name={name}
                            setName={setName}
                            error1={error1}
                            setError1={setError1}
                        />
                    </div>
                    <div className="bottomButtons">
                        <button onClick={ cancelClick } className={`buutt ${button ? "pressed" : ""}`}>Cancel edits</button>
                        <button onClick={ saveClick } disabled={button2} className={`buutt ${button2 ? "pressed" : ""}`}>Save edits</button>
                        <button onClick={ deleteClick } disabled={button1} className={`buutt ${button1 ? "pressed" : ""}`}>Remove event</button>
                    </div>
                </>      
            )}
        </div>
    )
}