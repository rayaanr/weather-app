import {useEffect, useState} from "react";
import moment from "moment";
import {CiLocationArrow1} from "react-icons/ci";
import {GiFrayedArrow, GiWindSlap} from "react-icons/gi";
import {BsDropletHalf} from "react-icons/bs";
import {FaTemperatureArrowDown, FaTemperatureArrowUp} from "react-icons/fa6";

interface WeatherData {
    city: string;
    country: string;
    date_time: string;
    temp: number;
    feels_like: number;
    weather: string;
    weather_description: string;
    temp_max: number;
    temp_min: number;
    humidity: number;
    wind: number;
    pressure: number;
    icon: string;
}

function CurrentWeather({lat, lon}: { lat: number; lon: number }) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=55f71626e6e908b7ffe69944f1add73b`);
            const data = await response.json();
            const updatedWeatherData: WeatherData = {
                city: data.name,
                country: data.sys.country,
                date_time: moment.unix(data.dt).format(),
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                weather: data.weather[0].main,
                weather_description: data.weather[0].description,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                humidity: data.main.humidity,
                wind: data.main.wind,
                pressure: data.main.pressure,
                icon: data.weather[0].icon
            };
            setWeatherData(updatedWeatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(() => {
        fetchWeatherData();
    }, [lat, lon]);

    return (
        <>
            {weatherData !== null && (
                <div className='bg-white bg-opacity-80 p-5 rounded-xl'>
                    <div className='flex justify-between'>
                        <h1>Current Weather</h1>
                        <h1>{moment(weatherData.date_time).format('dddd')} {moment(weatherData.date_time).format('ll')}</h1>
                    </div>
                    <div className='block sm:flex p-5 gap-20 items-center'>
                        <div className='w-full sm:w-2/4'>
                            <h1 className='flex items-center text-xl gap-2 font-semibold'>
                                <CiLocationArrow1/>{weatherData.city}, {weatherData.country}</h1>
                            <div className='flex gap-4 items-center'>
                                <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                                     alt='weather icon'/>
                                <h1 className='text-5xl font-thin'>{weatherData.temp}° C</h1>
                            </div>
                            <strong className='text-xl text-gray-500'>{weatherData.weather_description}</strong>
                        </div>
                        <div className='w-full sm:w-2/4'>
                            <h1>Feels like {weatherData.feels_like}°C</h1>
                            <div className={'flex gap-10 mt-2 mb-5'}>
                                <p className='flex gap-2 items-center'><FaTemperatureArrowUp/>{weatherData.temp_max}°C
                                </p>
                                <p className='flex gap-2 items-center'><FaTemperatureArrowDown/>{weatherData.temp_min}°C
                                </p>
                            </div>
                            <table>
                                <tbody className={'text-sm'}>
                                <tr>
                                    <td className='pr-3'><BsDropletHalf/></td>
                                    <td className='pr-3'>Humidity</td>
                                    <td>{weatherData.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><GiWindSlap/></td>
                                    <td>Wind</td>
                                    <td>{weatherData.wind}kph</td>
                                </tr>
                                <tr>
                                    <td><GiFrayedArrow/></td>
                                    <td>Pressure</td>
                                    <td>{weatherData.pressure}hPa</td>
                                </tr>
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CurrentWeather;
