import React from 'react'

import './about.css';

// statics
import info from "../../statics/Infopage.png";
import dash from "../../statics/Dash.png";
import todo from "../../statics/Todo.png";
import guide from "../../statics/guide.png";

export default function HowPage() {

    return (
        <div>
            <div className="containerabout">
                <img src={guide} alt="Helping teacher" className="guidePic"></img>
                <h1 className="gtext">A Small Schoodule Guide</h1>
                <div className="linebar"></div>
                <span className="hooker clamp">
                    Built to be as intuitive and simple as possible, Schoodule has three main sections where the majority of the features lie. Let's explore together!
                </span>
                <span className="howText">
                    Let's first take a look at the <strong className="emp">dashboard</strong>!
                    All courses and events will appear in your schedule. For courses, we vary the color intensity of each entry depending on its properties. You can see that lectures will always appear fully colorized, while discussions/labs are slightly lighter, and related office hours are the lightest. The clicking of any event will redirect you to the event's information page. 
                </span>
                <img  className='pic1 larger' src={dash} alt='Schoodule Dashboard'></img>
                <span className="howText">
                    Underneath the schedule, two simple buttons redirect you to a page listing all your courses or events. You will also be able to edit, create, and deleted entries in this section. When clicking on a specific course/event, you will be redirected to the <strong className="emp">information page</strong>. This is where you can easily view all the details regarding the selected course/event.
                </span>
                <img  className='pic1 larger' src={info} alt='Schoodule event information'></img>
                <span className="howText">
                    Let's dive into the <strong className="emp">todo lists</strong>!
                    When accessing the information page of any course or event, there will be a todo list button near the top right-hand corner of the page. When clicking it, you will be redirected to the specified todo list. The orange box is where you can create new todo entries. The blue boxes are the actual todos entries. We allow students to add, delete, mark as completed, and update all todos. Students are also able to filter their lists with the drop-down menu located in the orange box. 
                </span>
                <img  className='pic1 larger' src={todo} alt='Schoodule Todo list'></img>
                <span className="howText midend">
                    Hopefully, this guide helps you understand Schoodule. Now... good luck Schooduling! :)
                </span>
            </div>
        </div>
    )
}

