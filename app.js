const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const errorDiv = document.querySelector("#error");
const weatherCard = document.querySelector("#weatherCard");
const loading = document.querySelector("#loading");

async function getWeather() {
    const city = cityInput.value.trim();

    if(!city){
        alert("Enter a City!");
        return;
    }

    loading.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    errorDiv.classList.add("hidden");

    try{
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)

        if(!response.ok){
            throw new Error("City Couldn't Found!")
        }

        // give data in json form
        const data = await response.json()

        // === update data ====
        updateUI(data);
    } catch(err) {
        errorDiv.classList.remove("hidden");
         weatherCard.classList.add("hidden");
    } finally{
        loading.classList.add("hidden");
    }
};

// Update UI 

function updateUI(data) {
    const city = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].desc;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    document.querySelector("#cityName").innerText = `${city}, ${country}`;
    document.querySelector("#temp").innerText = `${temp}°C`;
    document.querySelector("#desc").innerText = desc;
    document.querySelector("#humidity").innerText = `${humidity}%`;
    document.querySelector("#wind").innerText = `${wind} km/h`;
    document.querySelector("#weatherIcon").src     
        = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keyup", (e) =>{
    if(e.key === "Enter") getWeather();
})