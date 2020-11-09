import { useState } from 'react';
import './App.css';
import Weather from './Components/Weather'

function App() {

let [cityName,setCityName] = useState("");

const setCity = () =>{
  // alert()
  return(
    <Weather cityName={cityName} />
  )
}

  return (
    <div className="container">
      <div className="card center z-depth-5">
        <span className="card-title">Weather Application</span>
        <hr/>
        <div class="card-content">
          <div className="row">
            <div className="input-field col s10">
              <input id="location" onBlur={e => setCityName(e.target.value)} type="text" className="validate" />
              <label htmlfor="location" className="">Search weather for location</label>
            </div>
            <div className="input-field col s2">
              {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
              <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => setCity()}>Show</button>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="row">
            Weather
            {setCity()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
