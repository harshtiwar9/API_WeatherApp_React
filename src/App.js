import { useRef, useState, useEffect } from 'react';
import './App.css';
import 'materialize-social/css/materialize.min.css';
import Weather from './Components/Weather/Weather'
import History from './Components/History/History'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

function App() {

  let [cityWeather, setCityWeather] = useState([]);
  let [showComponent, setShowComponent] = useState(false);
  let [showHistoryComponent, setShowHistoryComponent] = useState(false);
  let updatedHistory = useSelector(state => state.history);

  const location = useRef();
  const dbUrl = "http://api.weatherapi.com/v1/forecast.json?key=ad07e8abec5d42c693e205826200811";
  const dispatch = useDispatch();

  //Initialize Welcome Model
  useEffect(() => {

    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems, { dismissible: false });

    elems = document.querySelectorAll('.tooltipped');
    window.M.Tooltip.init(elems);

    elems = document.querySelectorAll('.fixed-action-btn');
    window.M.FloatingActionButton.init(elems);

    var elem = document.getElementById("welcome");
    window.M.Modal.getInstance(elem).open();

  },[]);

  //focus Input Text
  const focusInput = () => {
    document.getElementById("location").focus()
  }

  //adding city to store
  const addCityToList = (city) => {

    let data = {
      city: city.charAt(0).toUpperCase() + city.toLowerCase().slice(1)
    }
    dispatch({ 'type': 'addToHistory', data: data })
  }

  //calling function to set state for hide or show components and getting response from api
  //sending api response to component
  const sendingCityNameToRedux = () => {

    axios.get(dbUrl + "&q=" + location.current.value + "&days=10")
      .then(function (response) {
        addCityToList(location.current.value)
        setCityWeather(response.data)
        setShowComponent(true)
        setShowHistoryComponent(true)
      })
      .catch(function (error) {
        if (error.response.data.error.code === 1003) {
          window.M.toast({ html: "Please enter city name!" })
        } else if (error.response.data.error.code === 1006) {
          window.M.toast({ html: "City not found!" })
        } else {
          window.M.toast({ html: error.response.data.error.message })
        }
      })

  }

  const clearForm = () => {
    location.current.value = "";
    setCityWeather("")
    setShowComponent(false)
    setShowHistoryComponent(false)
    dispatch({ 'type': 'clearForm' })
  }

  const hideHistoryComponent = () => {

    if (updatedHistory.length === 0) {
      setShowHistoryComponent(false)
    } else {
      setShowHistoryComponent(true)
    }

  }

  function updateSearch(updateCitySearch) {

    axios.get(dbUrl + "&q=" + updateCitySearch + "&days=10")
      .then(function (response) {
        location.current.value = updateCitySearch;
        setCityWeather(response.data)
      })
      .catch(function (error) {
        if (error.response.data.error.code === 1003) {
          window.M.toast({ html: "Please enter city name!" })
        } else if (error.response.data.error.code === 1006) {
          window.M.toast({ html: "City not found!" })
        } else {
          window.M.toast({ html: error.response.data.error.message })
        }
      })

  }

  return (
    <div className="container center">

      <div className="card center z-depth-5">
        <span className="card-title">Weather Application</span>
        <hr />
        <div class="card-content">

          <form>
            <div className="row">
              <div className="input-field col s12 m6 l8">
                {/* <input id="location" onBlur={e => setCityName(e.target.value)} type="text" className="validate" /> */}
                <input id="location" ref={location} type="text" className="validate location" required />
                <label for="location" className="active">Search weather for location</label>
              </div>
              <div className="input-field col s6 m3 l2">
                {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
                <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => sendingCityNameToRedux()}>Show</button>
              </div>
              <div className="input-field col s6 m3 l2">
                {/* <a className="waves-effect waves-light btn" onClick={() => setCity()}>Show</a> */}
                <button className="btn waves-effect waves-light" type="button" name="action" onClick={() => clearForm()}>Reset</button>
              </div>
            </div>
          </form>

        </div>
      </div>

      { showComponent !== false ? <Weather cityWeather={cityWeather} /> : ""}

      { showHistoryComponent !== false ? <History hideHistoryComponent={() => hideHistoryComponent()} updateSearch={updateSearch} /> : ""}

      {/* <!-- Modal Structure --> */}
      <div id="welcome" class="modal">
        <div class="modal-content">
          <h4>Welcome <a href="#!" onClick={focusInput} className="black-text"><i class="material-icons modal-close right">close</i></a></h4>
          <hr />
          <p className="center">
            <div className="row">
              <div className="col s12">
                Hosted first project online. I hope you will like it!
                </div>
              <div className="col s12">
                Follow me @
                </div>
            </div>
            <div className="row">
              <div className="col s6 m4 l4">
                <a href="https://github.com/harshtiwar9/" target="_blank" class="waves-effect waves-light black-text btn-floating black social tooltipped" data-position="left" data-tooltip="Github">
                  <i class="fa fa-github"></i></a>
                <a href="https://github.com/harshtiwar9/" target="_blank" class="blue-text waves-effect waves-green btn-flat social github">Github</a>
              </div>
              <div className="col s6 m4 l4">
                <a href="https://www.instagram.com/harsh.tiwar9/" id="instagram-icon" target="_blank" class="waves-effect waves-light btn-floating social tooltipped" data-position="left" data-tooltip="Instagram">
                  <i class="fa fa-instagram"></i></a>
                <a href="https://www.instagram.com/harsh.tiwar9/" target="_blank" class="blue-text waves-effect waves-green btn-flat social instagram">Instagram</a>
              </div>
              <div className="col s6 m4 l4 center hide-on-small-only">
                <a href="mailto:harsh.tiwar9@gmail.com" class="waves-effect waves-light btn-floating red social tooltipped" data-position="left" data-tooltip="Email Me!">
                  <i class="fa fa-google"></i></a>
                <a href="mailto:harsh.tiwar9@gmail.com" class="blue-text waves-effect waves-green btn-flat social github">Email Me</a>
              </div>
              <div className="col s6 m4 l4 center push-s3 hide-on-med-and-up">
                <a href="mailto:harsh.tiwar9@gmail.com" class="waves-effect waves-light btn-floating red social tooltipped" data-position="left" data-tooltip="Email Me!">
                  <i class="fa fa-google"></i></a>
                <a href="mailto:harsh.tiwar9@gmail.com" class="blue-text waves-effect waves-green btn-flat social github">Email Me</a>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h6><b>Developed by <em>Harsh Tiwar</em></b></h6>
              </div>
            </div>
          </p>
        </div>
        <div class="modal-footer">
          <a href="#!" onClick={focusInput} class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">perm_identity</i>
        </a>
        <ul>
          <li><a href="https://github.com/harshtiwar9/" target="_blank" class="waves-effect waves-light black-text btn-floating black social tooltipped" data-position="left" data-tooltip="Github"><i class="fa fa-github"></i></a></li>
          <li><a href="https://www.instagram.com/harsh.tiwar9/" id="instagram-icon" target="_blank" class="waves-effect waves-light btn-floating social tooltipped" data-position="left" data-tooltip="Instagram"><i class="fa fa-instagram"></i></a></li>
          <li><a href="mailto:harsh.tiwar9@gmail.com" class="waves-effect waves-light btn-floating red social tooltipped" data-position="left" data-tooltip="Email Me!"><i class="fa fa-google"></i></a></li>
        </ul>
      </div>

    </div>
  );
}

export default App;
