import React, { useEffect } from 'react';
import './Weather.css'

function Weather ({cityWeather}){

let someDate;

const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

const month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

useEffect(() => {
    // Init Tabs Materialize JS
    let tabs = document.querySelectorAll(".tabs");
    window.M.Tabs.init(tabs);
});

const isToday = (someDate2) => {
    const today = new Date()
    someDate = new Date (someDate2)

    return (someDate.getDate()+1) == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

    return (
        <div className="row center card z-depth-5">

            {
                
                <div className="col s12 m3 l3">
                    <p>
                        City Name : {cityWeather['location']['name']} <br/>
                        Region : {cityWeather['location']['region']} <br/>
                        Country : {cityWeather['location']['country']} <br/>
                        Local Time : {cityWeather['location']['localtime']} <br/>
                        Time Zone : {cityWeather['location']['tz_id']} <br/>
                    </p>
                </div>
            }
            
            {

                <div class="col s12 m9 l9">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a class="active" href="#today">Today</a></li>
                            <li class="tab"><a href="#tomorrow">Tomorrow</a></li>
                            <li class="tab"><a href="#forecastDays">Forecast 3 Days</a></li>
                        </ul>
                    </div>
                    <div class="card-content grey lighten-4">
                        <div id="today">
                            
                            <div className="row">
                                <div className="col s12">
                                    Last Updated : {cityWeather['current']['last_updated']}
                                    <br/>
                                    H:{Math.round(cityWeather['forecast'].forecastday[0].day.maxtemp_c)} &#8451; , L:{Math.round(cityWeather['forecast'].forecastday[0].day.mintemp_c)} &#8451;
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <h3>{Math.round(cityWeather['current']['temp_c'])} &#8451;</h3>
                                </div>
                                <div className="col s6">
                                    <img className="activator circle" alt={cityWeather['current']['condition']['text']} src={cityWeather['current']['condition']['icon']} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    Feels Like : {Math.round(cityWeather['current']['feelslike_c'])} &#8451;
                                </div>
                                <div className="col s6">
                                    {cityWeather['current']['condition']['text']}
                                </div>
                            </div>
                            
                        </div>
                        <div id="tomorrow">

                                <div className="row">
                                    <div className="col s6">
                                        Last Updated : {cityWeather['current']['last_updated']}
                                        <br/>
                                        H:{Math.round(cityWeather['forecast'].forecastday[1].day.maxtemp_c)} &#8451; , L:{Math.round(cityWeather['forecast'].forecastday[1].day.mintemp_c)} &#8451;
                                    </div>
                                    <div className="col s6">
                                        <img className="activator circle" alt={cityWeather['forecast'].forecastday[1].day.condition.text} src={cityWeather['forecast'].forecastday[1].day.condition.icon} />
                                        <br/>
                                        {cityWeather['forecast'].forecastday[1].day.condition.text}
                                    </div>
                                </div>
                        </div>
                        <div id="forecastDays">
                            
                                    {/* {cityWeather['forecast']['forecastday']} */}
                                    
                                    {
                                        cityWeather['forecast']['forecastday'].map((elm,i) => {

                                                if(isToday(elm.date) === true){
                                                    return(<div className="row">
                                                        <div className="col s4">
                                                            <span>Today <br/> {elm.day.condition.text}</span>
                                                        </div>
                                                        <div className="col s4">
                                                            <img className="activator" alt={elm.day.condition.text} src={elm.day.condition.icon} />
                                                        </div>
                                                        <div className="col s4">
                                                            H: {Math.round(elm.day.maxtemp_c)} &#8451; <br/> L: {Math.round(elm.day.mintemp_c)} &#8451;
                                                        </div>
                                                    </div>)
                                                }else{
                                                    return(<div className="row">
                                                        <div className="col s4">
                                                            <span>{weekday[someDate.getDay()+1]} {month[someDate.getMonth()]} {someDate.getDate()+1} <br/> {elm.day.condition.text}</span>
                                                        </div>
                                                        <div className="col s4">
                                                            <img className="activator" alt={elm.day.condition.text} src={elm.day.condition.icon} />
                                                        </div>
                                                        <div className="col s4">
                                                            H: {Math.round(elm.day.maxtemp_c)} &#8451; <br/> L: {Math.round(elm.day.mintemp_c)} &#8451;
                                                        </div>
                                                    </div>)
                                                }

                                            })
                                    }

                        </div>
                    </div>
                </div>

            }

        </div>
    );
}

export default Weather;