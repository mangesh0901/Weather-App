const weatherform=document.querySelector(".WeatherForm");
const weatherCity=document.querySelector(".WeatherCity");
const container=document.querySelector(".container");
const apiKey="b1fd99bf9e2ae288ec2ee506a9e5b17c";

weatherform.addEventListener("submit", async event=>{
    event.preventDefault();
    const city= weatherCity.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }catch(error){
            // console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter the City");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response= await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could Not Fetch Data");
    }
    
    return await response.json();
    
}

function displayWeatherInfo(data){
    const {name: city, 
           main:{temp,humidity}, 
           weather:[{description, id}]}=data;

    container.textContent="";
    container.style.display="flex";

    const CityDisplay=document.createElement("h1");
    const CityTemp=document.createElement("p");
    const CityHumidity=document.createElement("p");
    const descDisplay=document.createElement("p");
    const emoji=document.createElement("p");

    CityDisplay.textContent=city;
    CityTemp.textContent=`${(temp-273.15).toFixed(1)}°C`;
    CityHumidity.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    emoji.textContent=getWeatherEmoji(id);

    CityDisplay.classList.add("CityDisplay");
    CityTemp.classList.add("CityTemp");
    CityHumidity.classList.add("CityHumidity");
    descDisplay.classList.add("descDisplay");
    emoji.classList.add("emoji");

    container.appendChild(CityDisplay);
    container.appendChild(CityTemp);
    container.appendChild(CityHumidity);
    container.appendChild(descDisplay);
    container.appendChild(emoji);
    

}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId <300): return "⛈️";
        
        case(weatherId >=300 && weatherId <400): return "🌧️";

        case(weatherId >=500 && weatherId <600): return "🌧️";

        case(weatherId >=600 && weatherId <700): return "❄️";

        case(weatherId >=700 && weatherId <800): return "🌁";

        case(weatherId === 800): return "☀️";

        case(weatherId >=801 && weatherId <810): return "☁️";

        default: return "⁉️";
    }

}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("error");

    container.textContent="";
    container.style.display="flex";
    container.appendChild(errorDisplay);
}