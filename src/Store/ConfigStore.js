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
            
            //check if city already in history
            const checkIfAlreadyInHistoryIdex = newCity.history.findIndex(city => city.city.toString().toLowerCase() === action.data.city.toString().toLowerCase());
            
            if(checkIfAlreadyInHistoryIdex === -1){//not match
                let newArray = [...newCity.history, action.data];
            
                return {
                    currentWeather: action.data.city,
                    history: newArray
                }
            }

        break;

        case "removeFromHistory" :

            const removeCityFromHistoryIndex = newCity.history.findIndex(city => city.city.toString().toLowerCase() === action.data.city.toString().toLowerCase());
            newCity.history.splice(removeCityFromHistoryIndex, 1);//remove the city from history
            let newArray1 = newCity.history;

            return {
                history : newArray1
            }

        break;

        case "clearForm":
            //clear evrything
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

export default store;