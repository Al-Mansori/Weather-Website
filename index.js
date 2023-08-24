import express from "express"
import axios from "axios"
import ejs from "ejs";

const app = express();
const port = 3000;

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=30.0626&longitude=31.2497&hourly=temperature_2m,precipitation_probability,weathercode,visibility,windspeed_10m,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_hours,precipitation_probability_max,windspeed_10m_max&timezone=Africa%2FCairo&forecast_days=1"

app.listen(port, () => { console.log("Server is running on port 3000") })

app.use(express.static("public"))


app.get("/", async (req, res) => {
    try {
        let response = await axios.get(API_URL);
        let data = response.data;
        let dayDescription;
        let d = new Date();
        let cHour = d.getHours();
        if (data.hourly.is_day[cHour]) {
            dayDescription = weatherListCode[data.hourly.weathercode[cHour]].day
        }
        else {
            dayDescription = weatherListCode[data.hourly.weathercode[cHour]].night
        }

        res.render("index.ejs", {
            date: data.daily.time[0],
            dailyMaxTemperature: data.daily.temperature_2m_max[0],
            dailyMinTemperature: data.daily.temperature_2m_min[0],
            //dailyApparentMaxTemperature: data.daily.apparent_temperature_max[0],
            //dailyApparentMinTemperature: data.daily.apparent_temperature_min[0],
            dailySunRise: data.daily.sunrise[0],
            dailySunSet: data.daily.sunset[0],
            hourlyWeatherCode: dayDescription,
            hourlyUvMaxIndex: data.hourly.uv_index[cHour],
            hourlyPrecipitationProbability: data.hourly.precipitation_probability[cHour],
            hourlyWindSpeed: data.hourly.windspeed_10m[cHour],
            hourlyIs_day: data.hourly.is_day[cHour],
            hourlyVisibility: data.hourly.visibility[cHour],
            temperature: data.hourly.temperature_2m[cHour],
            timezone: data.timezone,
        });
    } catch (error) {
        console.error(error.message)
        res.send(500)
    }

})


app.get("/weather", async (req, res) => {
    try {
        let response = await axios.get(API_URL);
        let data = response.data;
        let dayDescription;
        let d = new Date();
        let cHour = d.getHours();
        if (data.hourly.is_day[cHour]) {
            dayDescription = weatherListCode[data.hourly.weathercode[cHour]].day
        }
        else {
            dayDescription = weatherListCode[data.hourly.weathercode[cHour]].night
        }

        res.send({
            date: data.daily.time[0],
            dailyMaxTemperature: data.daily.temperature_2m_max[0],
            dailyMinTemperature: data.daily.temperature_2m_min[0],
            //dailyApparentMaxTemperature: data.daily.apparent_temperature_max[0],
            //dailyApparentMinTemperature: data.daily.apparent_temperature_min[0],
            dailySunRise: data.daily.sunrise[0],
            dailySunSet: data.daily.sunset[0],
            hourlyWeatherCode: dayDescription,
            hourlyUvMaxIndex: data.hourly.uv_index[cHour],
            hourlyPrecipitationProbability: data.hourly.precipitation_probability[cHour],
            hourlyWindSpeed: data.hourly.windspeed_10m[cHour],
            hourlyIs_day: data.hourly.is_day[cHour],
            hourlyVisibility: data.hourly.visibility[cHour],
            temperature: data.hourly.temperature_2m[cHour],
            timezone: data.timezone,
        });
    } catch (error) {
        console.error(error.message)
        res.send(500)
    }

})



//https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
let weatherListCode = {
    "0": {
        "day": {
            "description": "Sunny",
            "image": "http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night": {
            "description": "Clear",
            "image": "http://openweathermap.org/img/wn/01n@2x.png"
        }
    },
    "1": {
        "day": {
            "description": "Mainly Sunny",
            "image": "http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night": {
            "description": "Mainly Clear",
            "image": "http://openweathermap.org/img/wn/01n@2x.png"
        }
    },
    "2": {
        "day": {
            "description": "Partly Cloudy",
            "image": "http://openweathermap.org/img/wn/02d@2x.png"
        },
        "night": {
            "description": "Partly Cloudy",
            "image": "http://openweathermap.org/img/wn/02n@2x.png"
        }
    },
    "3": {
        "day": {
            "description": "Cloudy",
            "image": "http://openweathermap.org/img/wn/03d@2x.png"
        },
        "night": {
            "description": "Cloudy",
            "image": "http://openweathermap.org/img/wn/03n@2x.png"
        }
    },
    "45": {
        "day": {
            "description": "Foggy",
            "image": "http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night": {
            "description": "Foggy",
            "image": "http://openweathermap.org/img/wn/50n@2x.png"
        }
    },
    "48": {
        "day": {
            "description": "Rime Fog",
            "image": "http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night": {
            "description": "Rime Fog",
            "image": "http://openweathermap.org/img/wn/50n@2x.png"
        }
    },
    "51": {
        "day": {
            "description": "Light Drizzle",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Light Drizzle",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "53": {
        "day": {
            "description": "Drizzle",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Drizzle",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "55": {
        "day": {
            "description": "Heavy Drizzle",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Heavy Drizzle",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "56": {
        "day": {
            "description": "Light Freezing Drizzle",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Light Freezing Drizzle",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "57": {
        "day": {
            "description": "Freezing Drizzle",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Freezing Drizzle",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "61": {
        "day": {
            "description": "Light Rain",
            "image": "http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night": {
            "description": "Light Rain",
            "image": "http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
    "63": {
        "day": {
            "description": "Rain",
            "image": "http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night": {
            "description": "Rain",
            "image": "http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
    "65": {
        "day": {
            "description": "Heavy Rain",
            "image": "http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night": {
            "description": "Heavy Rain",
            "image": "http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
    "66": {
        "day": {
            "description": "Freezing Rain",
            "image": "http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night": {
            "description": "Freezing Rain",
            "image": "http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
    "67": {
        "day": {
            "description": "Freezing Rain",
            "image": "http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night": {
            "description": "Freezing Rain",
            "image": "http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
    "71": {
        "day": {
            "description": "Light Snow",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Light Snow",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "73": {
        "day": {
            "description": "Snow",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Snow",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "75": {
        "day": {
            "description": "Heavy Snow",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Heavy Snow",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "77": {
        "day": {
            "description": "Snow Grains",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Snow Grains",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "80": {
        "day": {
            "description": "Light Showers",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Light Showers",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "81": {
        "day": {
            "description": "Showers",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Showers",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "82": {
        "day": {
            "description": "Heavy Showers",
            "image": "http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night": {
            "description": "Heavy Showers",
            "image": "http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
    "85": {
        "day": {
            "description": "Snow Showers",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Snow Showers",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "86": {
        "day": {
            "description": "Snow Showers",
            "image": "http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night": {
            "description": "Snow Showers",
            "image": "http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
    "95": {
        "day": {
            "description": "Thunderstorm",
            "image": "http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night": {
            "description": "Thunderstorm",
            "image": "http://openweathermap.org/img/wn/11n@2x.png"
        }
    },
    "96": {
        "day": {
            "description": "Thunderstorm With Hail",
            "image": "http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night": {
            "description": "Thunderstorm With Hail",
            "image": "http://openweathermap.org/img/wn/11n@2x.png"
        }
    },
    "99": {
        "day": {
            "description": "Thunderstorm With Hail",
            "image": "http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night": {
            "description": "Thunderstorm With Hail",
            "image": "http://openweathermap.org/img/wn/11n@2x.png"
        }
    }
}