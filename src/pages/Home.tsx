import React, {useState} from "react";
import ForecastWeather from "../components/ForecastWeather.tsx";
import CurrentWeather from "../components/CurrentWeather.tsx";
import {AiOutlineSearch} from "react-icons/ai";

const Home = () => {
    const [lat, setLat] = useState<number>(6.927079);
    const [lon, setLon] = useState<number>(79.861244);
    const [userLat, setUserLat] = useState<number>(lat);
    const [userLon, setUserLon] = useState<number>(lon);

    const handleLatLonChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLat(userLat);
        setLon(userLon);
    }

    return (
        <div className={'w-11/12 sm:w-11/12 md:3/4 lg:w-3/5 mb-20 mt-10'}>
            <section className="flex gap-3 w-full mb-5 justify-center items-center">
                <img src="logo.svg" alt="logo" className="w-10 h-auto"/>
                <h1 className="text-3xl font-quantify">Weather App</h1>
            </section>
            <form
                className={'mb-8 pl-5 pt-1 pr-1 pb-1 justify-between items-center rounded-l-full rounded-r-full bg-white flex'}>
                <section className=''>
                    <label htmlFor='lat' className={'text-xs mr-2'}>Latitude</label>
                    <input
                        className='text-sm w-20 sm:w-32 bg-gray-200 rounded-r-full rounded-l-full pl-2 pr-2'
                        type='number'
                        id='lat'
                        value={userLat.toString()}
                        placeholder='Enter your latitude'
                        onChange={(e) => setUserLat(parseFloat(e.target.value))}
                    />
                </section>
                <section className=''>
                    <label htmlFor='lon' className={'text-xs mr-2'}>Longitude</label>
                    <input
                        className='text-sm w-20 sm:w-32 bg-gray-200 rounded-r-full rounded-l-full pl-2 pr-2'
                        type='number'
                        id='lon'
                        value={userLon.toString()}
                        placeholder='Enter your longitude'
                        onChange={(e) => setUserLon(parseFloat(e.target.value))}
                    />
                </section>
                <button onClick={handleLatLonChange}
                        className={'bg-blue-500 border border-blue-500 p-1 sm:pt-1 sm:pb-1 sm:pl-4 sm:pr-4 text-white rounded-full flex gap-3 items-center transition duration-200 delay-100 hover:bg-white hover:text-blue-500'}
                        type='submit'><span className={'hidden sm:flex'}>View</span><AiOutlineSearch className={'text-xl'}/></button>
            </form>

            <CurrentWeather lat={lat} lon={lon}/>

            <h1 className={'mt-5 mb-2 font-semibold text-xl'}>Extended Forecast</h1>

            <ForecastWeather lat={lat} lon={lon}/>
        </div>
    )
}

export default Home;

