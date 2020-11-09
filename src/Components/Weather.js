import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

function Weather ({cityName}){

let updatedWeather = useSelector(state => state.currentWeather);
const dispatch = useDispatch();

// let [isInCart,SetIsInCart] = useState(false);

const showWeatherOfCity = (cityName) =>{

    let data = {
        city : cityName
    }
    dispatch({'type': 'showWeather', data: data})
}
// console.log("here:"+cityName)

    return (
        <div className="">
            2222
            {showWeatherOfCity(cityName)}
            {updatedWeather}
        </div>
    );
}

export default Weather;