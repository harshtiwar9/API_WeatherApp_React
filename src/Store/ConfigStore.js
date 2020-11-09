import { createStore } from 'redux';
import axios from 'axios'

const defaultState = {
    currentWeather: [],
    errorWhileFetch : ""
}

// const axios = require('axios');
const dbUrl = "http://api.weatherapi.com/v1/current.json?key=ad07e8abec5d42c693e205826200811";
// http://api.weatherapi.com/v1/current.json?key=ad07e8abec5d42c693e205826200811&q=toronto

//reducer
function weatherInfo(state = defaultState, action) {

    let newWeather = Object.assign({}, state);

    switch (action.type) {
        case "showWeather":

            const city = action.data.city;
            // console.log(dbUrl+"&q="+city)
            axios.get(dbUrl+"&q="+city)
            .then(function(response) {
                // console.log(typeof(response.data))
                let newData = [response.data]
                console.log(newData)
                return {
                    currentWeather : newData
                }
            })
            .catch(function(error) {
                // newWeather.currentWeather(error)
                return {
                    errorWhileFetch : error
                }
            })
            break;

        default:
            return newWeather.currentWeather;

    }
    // return newCart;
}

var store = createStore(weatherInfo,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(store.getStore())
// store.dispatch({type: 'addItem', data: productName})

export default store;