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
        <div className={'w-11/12 sm:w-3/5 mb-20 mt-10'}>
            <form
                className={'mt-5 mb-5 pl-5 pt-1 pr-1 pb-1 justify-between items-center rounded-l-full rounded-r-full bg-white flex'}>
                <section className=''>
                    <label htmlFor='lat' className={'text-xs mr-2'}>Latitude</label>
                    <input
                        className='text-sm w-32 bg-gray-200 rounded-r-full rounded-l-full pl-2 pr-2'
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
                        className='text-sm w-32 bg-gray-200 rounded-r-full rounded-l-full pl-2 pr-2'
                        type='number'
                        id='lon'
                        value={userLon.toString()}
                        placeholder='Enter your longitude'
                        onChange={(e) => setUserLon(parseFloat(e.target.value))}
                    />
                </section>
                <button onClick={handleLatLonChange}
                        className={'bg-blue-500 pt-1 pb-1 pl-4 pr-4 text-white rounded-full flex gap-3 items-center'}
                        type='submit'>Submit <AiOutlineSearch className={'text-xl'}/></button>
            </form>

            <CurrentWeather lat={lat} lon={lon}/>

            <h1 className={'mt-5 mb-2 font-semibold text-xl'}>Extended Forecast</h1>

            <ForecastWeather lat={lat} lon={lon}/>
        </div>
    )
}

export default Home;

