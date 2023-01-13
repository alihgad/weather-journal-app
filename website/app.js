
/* Global Variables */
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const content = document.querySelector('#content');
const feeling = document.querySelector('#feelings');
const temp = document.querySelector('#temp');
const date = document.querySelector("#date");
const form = document.querySelector('.entery');
const title = document.querySelector(".title");
const all = document.querySelector(".entryHolder");

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=f02311ef44f6f32cff2a21d054c3333f&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
const d =  new Date();
const newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
generate.addEventListener('click', (event) => {
    event.preventDefault();
    const madeURL = `${baseURL}${zip.value}${apiKey}`;
    getData(madeURL)
        .then((data) => {
            cureData(data)
                .then((info) => {
                    postData('/weather', info)
                        .then((data) => {
                            retrieveData('/weather')
                            .then((data) =>{ 
                            updateContent(data);
                            })
                        })
                })
        })
})

const getData = async(URL) => {
        try{
            const result = await fetch (URL);
            const data = await result.json();
            if(data.cod == 200){
            return data;
            }else{
                console.log(data);    
                return data ;
            }
        }catch(e){
            console.log(`errorfrom get data func${e}`)
        }
}

const cureData = async(data)=>{
    try{
        if (data.cod == 404 || data.cod == 400 ){
        const info = data.message;
        console.log(info);
        title.innerHTML = info;
        date.innerHTML = "";
        temp.innerHTML = "";
        content.innerHTML = "";
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
const retrieveData = async (url) => {
    const response = await fetch(url);
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};
const updateContent = async (data) => {
    if (data){
        date.innerHTML = `date: ${newDate}`;
        temp.innerHTML = `temp: ${Math.round(data.temp)}`;
        content.innerHTML = data.content ? data.content : "what is your feeling" ;
        title.innerHTML = "";
}
}
