
/* Global Variables */
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const content = document.querySelector('#content');
const feeling = document.querySelector('#feelings');
const temp = document.querySelector('#temp');
const date = document.querySelector("#date");
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=f02311ef44f6f32cff2a21d054c3333f&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
generate.addEventListener('click', (event) => {
    event.preventDefault();
    const madeURL = `${baseURL}${zip.value}${apiKey}`;
    getData(madeURL)
    .then((data) =>{
        cureData(data)
        .then((info)=>{
            postData('/weather',info)
            .then((data)=>{
                // retrieveData('/weather')
                //     .then((data) => 
                        updateContent(data);
                
            })
        })
    })
})
;

const getData = async(URL) => {
        try{
            const result = await fetch (URL);
            const data = await result.json();
            if(data.cod == 200){
            return data;
            }else{
                return data;    
            }
        }catch(e){
            console.log(`error${e}`)
        }
}

const cureData = async(data)=>{
    try{
    if(data.message){
        const info = data.message;
        console.log(info);
        return info ;
    }else{    
    const info  = {
        date : d ,
        content : feeling.value ,
        temp: data.main.temp 
    };
        console.log(info);
    return info;}
}catch(er){
    console.log(`error${er}`);
}
}
const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};
// const retrieveData = async (url) => {
//     const response = await fetch(url);
//     try {
//         const result = await response.json();
//         return result;
//     } catch (err) {
//         console.error(err);
//     }
// };
const updateContent = async (data) => {
    if(data.date){
        date.innerHTML = `date: ${data.date}`;
        temp.innerHTML = `temp: ${data.temp}`;
        content.innerHTML = data.content;
    }else{
        content.innerHTML = data.message;
    }
    
}
