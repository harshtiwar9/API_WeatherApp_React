import { createStore } from 'redux';
import axios from 'axios'

const defaultState = {
    currentCity: "",
    history : [],
    errorWhileFetch : ""
}

// const axios = require('axios');
const dbUrl = "http://api.weatherapi.com/v1/current.json?key=ad07e8abec5d42c693e205826200811";
// http://api.weatherapi.com/v1/current.json?key=ad07e8abec5d42c693e205826200811&q=toronto

//reducer
function weatherInfo(state = defaultState, action) {

    let newCity = Object.assign({}, state);

    switch (action.type) {
        case "addToHistory":
            
            let newArray = [...newCity.history, action.data];
            
            return {
                currentWeather: action.data.city,
                history: newArray
            }

        break;

        default:
            return newCity;

    }
    // return newCart;
}

var store = createStore(weatherInfo,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(store.getStore())
// store.dispatch({type: 'addItem', data: productName})

export default store;