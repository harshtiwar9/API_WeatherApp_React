import { useRef, useState } from 'react';
import './App.css';
import Weather from './Components/Weather/Weather'
import History from './Components/History/History'
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios'

function App() {

let [cityName,setCityName] = useState("");
let [cityWeather,setCityWeather] = useState([]);
let [showComponent,setShowComponent] = useState(false);
let [showHistoryComponent,setShowHistoryComponent] = useState(false);
let updatedHistory = useSelector(state => state.history);

const location = useRef();

const dbUrl = "http://api.weatherapi.com/v1/forecast.json?key=ad07e8abec5d42c693e205826200811";

const dispatch = useDispatch();

// const handleState = (value) =>{
//   // alert(e)
//   setShowComponent(value)
// }

const addCityToList = (city) =>{

  // console.log(city.charAt(0).toUpperCase() + city.toLowerCase().slice(1))

  let data = {
      city : city.charAt(0).toUpperCase() + city.toLowerCase().slice(1)
  }
  dispatch({'type': 'addToHistory', data: data})
}

const sendingCityNameToRedux = () =>{
  
  // setCityName(location.current.value)
  axios.get(dbUrl+"&q="+location.current.value+"&days=10")
          .then(function(response) {
            addCityToList(location.current.value)
            setCityWeather(response.data) 
            setShowComponent(true)
            setShowHistoryComponent(true)
          })
          .catch(function(error) {
            // console.log(error)
            window.M.toast({html: error.response.data.error.message})
          })

}

const clearForm = () => {
  location.current.value = "";
  setCityWeather("") 
  setShowComponent(false)
  setShowHistoryComponent(false)
  dispatch({'type': 'clearForm'})
}

const hideHistoryComponent = () => {

  if(updatedHistory.length === 0){
   setShowHistoryComponent(false) 
  }else{
    setShowHistoryComponent(true)
  }

}

  return (
    <div className="container center">
      <div className="card center z-depth-5">
        <span className="card-title">Weather Application</span>
        <hr/>
        <div class="card-content">
          
          <form>
            <div className="row">
              <div className="input-field col s9">
                {/* <input id="location" onBlur={e => setCityName(e.target.value)} type="text" className="validate" /> */}
                <input id="location" ref={location} type="text" className="validate location" required />
                <label htmlfor="location" className="">Search weather for location</label>
              </div>
              <div className="input-field col s2">
                {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
                <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => sendingCityNameToRedux()}>Show</button>
              </div>
              <div className="input-field col s1">
                {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
                <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => clearForm()}>Reset</button>
              </div>
            </div>
          </form>

        </div>
      </div>

      { showComponent != false ? <Weather cityName={location.current.value} cityWeather={cityWeather} /> : "" }

      { showHistoryComponent != false ? <History hideHistoryComponent={() => hideHistoryComponent()} /> : "" }
    </div>
  );
}

export default App;
