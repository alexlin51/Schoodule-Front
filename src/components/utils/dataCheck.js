import timeCompare from './timeCompare';

export default function dataCheck(object){
    // Check Time Form
    if (timeCompare(object.stime, object.etime)){
        return true
    }

    // Check the Discussion
    for (let i = 0; i !== object.discussion.length; i++){
        let short = object.discussion[i]
        if(timeCompare(short.stime, short.etime)){
            return true
        }
    }

    // Check the Professor
    for (let i = 0; i !== object.professor.length; i++){
        let short1 = object.professor[i]
        for(let j = 0; j !== short1.oh.length; j++){
            let short2 = short1.oh[j]
            if(timeCompare(short2.stime, short2.etime)){
                return true
            }
        }
    }

     // Check the Professor
     for (let i = 0; i !== object.ta.length; i++){
        let short1 = object.ta[i]
        for(let j = 0; j !== short1.oh.length; j++){
            let short2 = short1.oh[j]
            if(timeCompare(short2.stime, short2.etime)){
                return true
            }
        }
    }

    return false
    
}