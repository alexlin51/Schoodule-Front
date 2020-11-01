import React from 'react';
import Axios from 'axios';
import { CustomDialog, Dialog, useDialog } from 'react-st-modal';

import './survey.css';

// function to call popup
const popSurvey = async (url) =>{
    const result = await CustomDialog(<CustomDialogContent link={url}/>, {
        showCloseIcon: false,
      });
}

// popup for the survery
function CustomDialogContent(props) {
    const dialog = useDialog()
  
    return (
      <div className="maindia">
        <h1 className="headerdia">Schoodule Interest Survery</h1>
        <div className="diaBar"></div>
        <span className="diatext">
            Hey there! It looks like you haven't gotten the chance to take part in our interest surveys yet. We'd love to get to know our users better, so we'd truely appreciate you taking a moment to fill out a very brief survey. Better yet, this pop up will no longer appear after!
        </span>
        <div className="rightdia">
            <div>
                <button className="diabutt gooddia"
                onClick={() => {
                    window.open(props.link, '_blank');
                    dialog.close();
                }}
                >
                Yeah sure!
                </button>
                <button className="diabutt baddia"
                onClick={() => {
                    dialog.close();
                }}
                >
                Maybe next time
                </button>
                </div>
        </div>
      </div>
    );
}

export default async function surveyProc(){
    let token = localStorage.getItem('auth-token');
    
    const pullData = async (token) => {
        let surveyData = await Axios.post(
            'http://localhost:5000/surveyOne/grab', 
            null,
            { headers: { 'X-Auth-Token': token } },
        );
        
        return surveyData.data
    }

    let myStat = await pullData(token)
    
    // First main split on the true or false
    if(myStat.complete === false){
        // we need to make the calls to the google sheet now to pull down the data set. 
        const incrementData = async (token) => {
            let surveyData = await Axios.post(
                'http://localhost:5000/surveyOne/popup', 
                null,
                { headers: { 'X-Auth-Token': token } },
            );
            
            return surveyData.data
        }

        let popup = await incrementData(token)
        let userID = popup.userID
        if(popup.popup){
            let url = `https://docs.google.com/forms/d/e/1FAIpQLSfaYK-7grQ-UdZ9GMu83F0wtK-MhmH2XNySdrCq_FSelsFXyg/viewform?entry.731187472=${userID}`

            popSurvey(url)
        }
    }
}