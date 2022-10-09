export const generateDateString = (date) => {
    let parsedDate = new Date(date);
    // return YYYY/MM/DD
    let year = String(parsedDate.getFullYear()).padStart(4,'0')
    let month = String(parsedDate.getMonth()+1).padStart(2,'0')
    let day = String(parsedDate.getDate()).padStart(2,'0')

    let newstring = `${year}-${month}-${day}`;
    console.log(newstring)
    return newstring;
}