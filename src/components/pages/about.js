import React from 'react'

import './about.css';

// statics
import schoodule from '../../statics/Schoodule.png';
import thinker from '../../statics/Critical_thinking.png';
import students from '../../statics/studentsneed.png';
import grad from  '../../statics/grad.png';


export default function AboutPage() {

    return (
        <div>
            <div className="containerabout">
                <img  className='logoPic' src={schoodule} alt='Logo'></img>
                <span className="hooker">
                    Hello, my fellow bruins and friends! I'd like to introduce you guys to Schoodule! :)
                </span>
                <div className="bardiv"></div>
                <div className="row">
                    <img  className='pic1 p1' src={thinker} alt='Thinking student'></img>
                    <div className="textbox">
                        <span className="btext">
                            I know what you may be thinking, how in the world do I even say that name. Well, I have no idea either. Pronounce it in anything you want, but just know that it's here to support you in your academic career! 
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="textbox te2">
                        <span className="btext">
                            This project was spurred by a simple, yet common, issue that you may relate to at the beginning of each quarter/semester... the dreaded deciphering and compilation of ALL your upcoming courses' syllabi. For those familiar with this struggle, you can understand the motivation behind this project. For those who don't, we at Schoodule can hopefully introduce you to a solution for the problem you never knew you had!  
                        </span>
                    </div>
                    <img  className='pic1 det2' src={students} alt='College Students'></img>
                </div>
                <div className="row r3">
                    <img  className='pic1 p3' src={grad} alt='Sucessful Students'></img>
                    <div className="textbox t3">
                        <span className="btext">
                            With Schoodule, we provide one simple location where students can store and track academic progress. Built with every student's needs as its highest priority, Schoodule allows you to concisely store all bits of information regarding a course or extracurricular event. Our goal is to provide every student with a simple solution for academic management. Now let's get to Schooduling!
                        </span>
                    </div>
                </div>
                <span className="notice">
                    <span className="redme">*Note: </span>This current version is a beta and maybe rough around the edges, but it should get the job done. This application only supports desktop views for now, but mobile views should roll out eventually. Our team at Schooldule would love to hear any feedback or ideas that you may want! You can send us any message at the bottom right button. We hope to eventually launch a refined version with many more features to help you achieve your goals!
                </span>
            </div>
        </div>
    )
}

