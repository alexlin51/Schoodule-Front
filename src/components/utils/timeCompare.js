export default function timeCompare(start, end){
    // we will recieve 2 times and we need to return true or false for the order.
    if(start === null || end === null){
        return false
    }
    var startSplit = start.split(":")
    var startHour = parseInt(startSplit[0])
    var startMinute = parseInt(startSplit[1])

    var endSplit = end.split(":")
    var endHour = parseInt(endSplit[0])
    var endMinute = parseInt(endSplit[1])

    if(endHour > startHour){
        return false;
    }
    if(endHour === startHour){
        if( endMinute > startMinute){
            return false;
        }
        else{
            return true;
        }
    }
    if(endHour < startHour){
        return true;
    }
// false for no error, true for error
}