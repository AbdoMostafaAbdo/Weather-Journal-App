/* Global Variables */
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=c11288996bdd299648373e5b0abca897&units=imperial';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const URL = `${baseURL}${newZip}${apiKey}`;
    getData(URL).then(function(data){
        // console.log(data)
        postData('/add', {date:newDate, temp:data.main.temp, content:feelings}).then((data) =>{ 
            retrieveData(data);});
    })
}
/* Function to GET Web API Data*/
const getData = async (URL)=>{
    const res = await fetch(URL)
    try{
        const data = await res.json();
        // console.log(data)
        return data;
    }catch(error){
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
    //   console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    // console.log(allData)
    // Write updated data to DOM elements
    date.innerHTML = `Date: ${allData.date}`;
    temp.innerHTML = `Temp: ${Math.round(allData.temp)} degrees`;
    content.innerHTML = `Feeling: ${allData.content}`;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
