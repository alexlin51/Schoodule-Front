export default function sortDays(dayArray){
    let rank = {
        'M' : 0,
        'T' : 1,
        'W' : 2,
        'Th' : 3,
        'F' : 4,
        'Sat': 5,
        'Sun': 6
    }

    let reverse = {
        0 : 'M',
        1 : 'T',
        2 : 'W',
        3 : 'Th',
        4 : 'F',
        5 : 'Sat',
        6 : 'Sun'
    }

    // lets turn the array into a number list
    let change = dayArray
    for ( let i = 0 ; i !== dayArray.length; i++){
        change[i] = rank[dayArray[i]]
    }

    change = change.sort()

    for (let j = 0; j !== change.length; j++){
        change[j] = reverse[change[j]]
    }

    return change


}