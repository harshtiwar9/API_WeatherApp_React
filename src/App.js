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
const location = useRef();

const dbUrl = "http://api.weatherapi.com/v1/forecast.json?key=ad07e8abec5d42c693e205826200811";

const dispatch = useDispatch();

// const handleState = (value) =>{
//   // alert(e)
//   setShowComponent(value)
// }

const addCityToList = (city) =>{

  let data = {
      city : city
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
          })
          .catch(function(error) {
            console.log(error)
            window.M.toast({html: error.response.data.error.message})
          })

}

  return (
    <div className="container center">
      <div className="card center z-depth-5">
        <span className="card-title">Weather Application</span>
        <hr/>
        <div class="card-content">
          <div className="row">
            <div className="input-field col s9">
              {/* <input id="location" onBlur={e => setCityName(e.target.value)} type="text" className="validate" /> */}
              <input id="location" ref={location} type="text" className="validate" />
              <label htmlfor="location" className="">Search weather for location</label>
            </div>
            <div className="input-field col s2">
              {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
              <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => sendingCityNameToRedux()}>Show</button>
            </div>
            <div className="input-field col s1">
              {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
              <button className="btn waves-effect waves-light" type="button" name="action" onClick="">Clear</button>
            </div>
          </div>
        </div>
        {/* <div className="card-content">
          <div className="row">
            { showComponent != false ? <Weather cityName={location.current.value} cityWeather={cityWeather} /> : "" }
          </div>
        </div> */}
      </div>

      { showComponent != false ? <Weather cityName={location.current.value} cityWeather={cityWeather} /> : "" }

      { showComponent != false ? <History /> : "" }
    </div>
  );
}

export default App;
