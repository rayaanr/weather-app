import {useEffect, useState} from "react";
import moment from "moment";
import {API_Key} from "../credentials.ts";

// ForecastData structure
export interface ForecastData {
    temp: number;
    weather: string;
    date: string;
    time: string;
    icon: string;
}

function ForecastWeather({lat, lon}: { lat: number; lon: number }) {
    const [forecastData, setForecastData] = useState<Record<string, ForecastData[]> | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);
    const API_KEY = API_Key;

    const toggleShowAll = () => {   // Toggle showAll state
        setShowAll(!showAll);
    }

    const fetchForecastData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
            const data = await response.json();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const updatedForecastData = data.list.reduce((acc, item) => {
                const date = moment(item.dt_txt).format('YYYY-MM-DD');
                const time = moment(item.dt_txt).format('HH:mm:ss');
                const forecastItem: ForecastData = {
                    temp: item.main.temp,
                    weather: item.weather[0].main,
                    date: date,
                    time: time,
                    icon: item.weather[0].icon,
                };

                if (acc[date]) {    // If date already exists in acc, push forecastItem to acc[date]
                    acc[date].push(forecastItem);
                } else {    // Else, create new key-value pair in acc
                    acc[date] = [forecastItem];
                }
                return acc;
            }, {});

            setForecastData(updatedForecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(() => {   // Fetch weather data when lat or lon changes
        fetchForecastData();
    }, [lat, lon]);

    return (
        <>
            {forecastData !== null && (
                <>
                    <div>
                        {Object.keys(forecastData).slice(0, showAll ? undefined : 3).map((date) => (    // Show only 3 days till showAll is clicked
                            <div key={date} className={'mb-2 p-5 bg-white bg-opacity-40 rounded-xl overflow-auto'}>
                                <h1 className={'mb-2'}>
                                    {moment(new Date()).format('l') === moment(date).format('l') ?
                                        <span>Today</span>
                                        : <span>{moment(date).format('dddd')}</span>
                                    }
                                    <span className={'text-xs text-gray-600'}> ({moment(date).format('ll')})</span>
                                </h1>

                                <div className='flex justify-start sm:justify-center gap-10 text-sm'>
                                    {forecastData[date].map((item, index) => (
                                        <div key={index} className='text-center'>
                                            <p className={'italic'}>{item.time.slice(0, 5)}</p>
                                            <img src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                                                 alt='weather icon'/>
                                            <p className={'font-semibold'}>{item.weather}</p>
                                            <p className={'text-xs'}>{item.temp}°C</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={toggleShowAll}
                            className={'mt-5 pt-2 pb-2 pl-5 pr-5 border-2 block m-auto text-blue-500 border-blue-500 bg-white rounded-l-full rounded-r-full hover:text-white hover:bg-blue-500 hover:border-blue-500 transition duration-200 delay-100'}>
                        {showAll ? 'show less' : 'see more'}
                    </button>
                </>
            )}
        </>
    )
}

export default ForecastWeather;

