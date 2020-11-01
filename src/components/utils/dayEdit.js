export default function dayEdit(day){
    let dayArray = day.split(",");

    for (let i = 0; i !== dayArray.length; i++){
        if(dayArray[i] === "M"){
            dayArray[i] = "Monday"
        }
        if(dayArray[i] === "T"){
            dayArray[i] = "Tuesday"
        }
        if(dayArray[i] === "W"){
            dayArray[i] = "Wednesday"
        }
        if(dayArray[i] === "Th"){
            dayArray[i] = "Thursday"
        }
        if(dayArray[i] === "F"){
            dayArray[i] = "Friday"
        }
        if(dayArray[i] === "Sat"){
            dayArray[i] = "Saturday"
        }
        if(dayArray[i] === "Sun"){
            dayArray[i] = "Sunday"
        }
    }

    let mid = ", "

    let dayz = ""
    for(let t = 0; t !== dayArray.length; t++){
        if(t !== 0){
            dayz = dayz.concat(mid);
        }
        dayz = dayz.concat(dayArray[t]);
    }
    return dayz
}