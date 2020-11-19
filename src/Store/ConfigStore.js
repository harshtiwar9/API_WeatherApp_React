import { createStore } from 'redux';

const defaultState = {
    currentCity: "",
    history : []
}

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

        case "removeFromHistory" :

            const removeCityFromHistoryIndex = newCity.history.findIndex(city => city.city.toString().toLowerCase() === action.data.city.toString().toLowerCase());
            newCity.history.splice(removeCityFromHistoryIndex, 1);
            let newArray1 = newCity.history;

            return {
                history : newArray1
            }

        break;

        case "clearForm":
            
            return {
                currentWeather: "",
                history: []
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