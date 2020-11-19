import React, { useEffect } from 'react';
import './Weather.css'
import M from "materialize-css/dist/js/materialize.min.js";

function Weather ({cityName, cityWeather}){

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
    M.Tabs.init(tabs);
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

// {
//     <div class="col s12 m7">
//         <div class="card horizontal">
//             <div class="card-image">
//                 {/* <img src="https://lorempixel.com/100/190/nature/6" /> */}
//             </div>
//             <div class="card-stacked">
//                 <div class="card-content nav-wrapper">
//                     <ul className="nav-content">
//                         {cityWeather['forecast'].forecastday[0].hour.map((elm,i) => {
//                             // cityWeather['forecast'].forecastday[0].hour[i].time.substring(11)
//                             // <span>{elm['time'].substring(11)}</span>
//                             return (
//                                     <li className="">{elm['time'].substring(11)}</li>
//                                 )

//                             // console.log(elm['time'].substring(11))
//                         })}
//                     </ul>
                    
//                 {/* {cityWeather['forecast'].forecastday[0].hour[0].time.substring(11)} */}

                    
//                 </div>
//                 <div class="card-action">
//                     <a href="#">This is a link</a>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

//small card
// {

//     <div className="col s12 m6 l3 card small sticky-action z-depth-5">

//         <div className="card-content">

//             <h5 className="cityName">{cityName}</h5>
//             {cityWeather['current']['condition']['text']}
//             <h5>{cityWeather['current']['temp_c']} &#8451;</h5>
//             <div className="center waves-effect waves-block waves-light">
//                 <img className="activator circle" src={cityWeather['current']['condition']['icon']} />
//             </div>

//         </div>

//         <div className="card-action">
//             {console.log(cityWeather['forecast'])}
//             <span className="card-title activator grey-text text-darken-4 cityName">H:{Math.round(cityWeather['forecast'].forecastday[0].day.maxtemp_c)} &#8451; , L:{Math.round(cityWeather['forecast'].forecastday[0].day.mintemp_c)} &#8451; <i className="material-icons right">more_vert</i></span>
//         </div>
    
//         <div className="card-reveal">
//             <span class="card-title grey-text text-darken-4 cityName">{cityName}<i class="material-icons right">close</i></span>
//             <p>
//                 Feels Like : {Math.round(cityWeather['current']['feelslike_c'])} &#8451;
//             </p>
//         </div>
//     </div>
// }