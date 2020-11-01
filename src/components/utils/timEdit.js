export default function timeEdit(time){
    let timeArray = time.split(":");

    let session = "AM"

    let hour = parseInt(timeArray[0], 10) 

    if(hour > 11){
        if(hour !== 12){
            timeArray[0] = (hour - 12).toString()
        }
        session = "PM"
    }

    return `${timeArray[0]}:${timeArray[1]} ${session}`
}