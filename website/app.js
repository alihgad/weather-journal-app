
/* Global Variables */
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const feeling = document.querySelector('.feelings');
const temp = document.querySelector('#temp');
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=f02311ef44f6f32cff2a21d054c3333f&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
generate.addEventListener('click', (event) => {
    event.preventDefault();
    const madeURL = `${baseURL}${zip.value}${apiKey}`;
    getData(madeURL);
});

const getData = async(URL) => {
        try{
            const result = await fetch (URL);
            const data = await result.json();
            console.log(data)
            return data;
        }catch(e){
            console.log(`error${e}`)
        }
}
