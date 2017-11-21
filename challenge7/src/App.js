import React, { Component } from 'react';
import './App.css';

import Form from './Form';
import List from './List';
import WeatherCurrent from './WeatherCurrent';

// API key from https://openweathermap.org/
var OPEN_WEATHER_KEY = '3afb89ff3b34566750f8fdc7e145193c';

var STORAGE_KEY = 'todoList';
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status == 404)
        return false
    else
        return true;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec ;
    return time;
}


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        var savedListString = localStorage.getItem(STORAGE_KEY);
        var savedListArray = JSON.parse(savedListString) || [];

        this.setState({
            list: savedListArray
        });

        // Here's how you could fetch data about the first item in the list
        // this.fetchWeather(savedListArray[0]);
    }

    render() {
        return (
            <div>
                {/* Your app content goes here */
                    <div className="container">
                        <h3>React Weather</h3>
                        <hr />

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="App">
                                    <Form
                                        onFormSubmit={(item) => {
                                            this.handleFormSubmit(item);  
                                        }}          
                                    />

                                    {<WeatherCurrent
                                        icon={this.state.icon}
                                        name={this.state.name}
                                        weather={this.state.weather}
                                        weatherName={this.state.weatherName}
                                        weatherTemp={this.state.weatherTemp}
                                        weatherDesc={this.state.weatherDesc}
                                        maxTemp={this.state.maxTemp}
                                        minTemp={this.state.minTemp}
                                        sunrise={this.state.sunrise}
                                        sunset={this.state.sunset}
                                        humidity={this.state.humidity}
                                    />}
                                <div id="weather-error" className="alert alert-danger" role="alert"></div> 
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="App">
                                    <List
                                        list={this.state.list}
                                        onItemRemoved={(item) => {
                                            this.handleItemRemoved(item);
                                        }}
                                        onRecentCity={(item) => {
                                            this.fetchWeather(item);
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    handleItemRemoved(itemToRemove) {
        var existingList = this.state.list;

        // Remove any items from the list that equal the removed item
        var newList = existingList.filter((item) => {
            return item !== itemToRemove;
        });

        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    }

    handleFormSubmit(itemToAdd) {
        var existingList = this.state.list;
        var newList = existingList.concat([ itemToAdd ]);

        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        
        
        var temp = document.getElementById('temp');
        temp.classList.remove('alert-danger');
        temp.classList.add('active');

        var weatherDesc = document.getElementById('weatherDesc');
        weatherDesc.classList.remove('alert-danger');
        weatherDesc.classList.add('active');

        var weather = document.getElementById('weather');
        weather.classList.remove('alert-danger');
        weather.classList.add('active');

        var maxTemp = document.getElementById('maxTemp');
        maxTemp.classList.remove('alert-danger');
        maxTemp.classList.add('active');

        var minTemp = document.getElementById('minTemp');
        minTemp.classList.remove('alert-danger');
        minTemp.classList.add('active');

        var sunrise = document.getElementById('sunrise');
        sunrise.classList.remove('alert-danger');
        sunrise.classList.add('active');

        var sunset = document.getElementById('sunset');
        sunset.classList.remove('alert-danger');
        sunset.classList.add('active');

        var humidity = document.getElementById('humidity');
        humidity.classList.remove('alert-danger');
        humidity.classList.add('active');

        var icon = document.getElementById('icon');
        icon.classList.remove('alert-danger');
        icon.classList.add('active');

        this.fetchWeather(itemToAdd);
    }

    // Helper function to fetch weather for a specific query
    fetchWeather(query) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=' + OPEN_WEATHER_KEY;
        var zip = 'https://api.openweathermap.org/data/2.5/weather?zip=' + query + '&units=imperial&appid=' + OPEN_WEATHER_KEY;

        if (!UrlExists(url)) {
            url = zip;
        }

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
                var name = json.name;
                var temperature = json.main.temp;

                var weather = json.weather[0];
                var weatherName = weather.main;
                var weatherDesc = weather.description;
                var icon = weather.icon;
                var minTemp = json.main.temp_min;
                var maxTemp = json.main.temp_max;
                var sunrise = json.sys.sunrise;
                var sunset = json.sys.sunset;
                var humidity = json.main.humidity;

                this.setState({
                    name: name,
                    weather: weather,
                    weatherName: weatherName,
                    weatherDesc: weatherDesc,
                    weatherTemp: temperature,
                    sunrise: timeConverter(sunrise),
                    sunset: timeConverter(sunset),
                    minTemp: minTemp,
                    maxTemp: maxTemp,    
                    humidity: humidity,       
                    icon: "http://openweathermap.org/img/w/"+icon+".png"
                });

                var weatherError = document.getElementById('weather-error');
                weatherError.textContent = "";
                weatherError.classList.remove('active');
                

            }).catch( function() {
                var weatherError = document.getElementById('weather-error');
                weatherError.textContent = "Invalid Location";
                weatherError.classList.add('active');
            });
    }
}

export default App;
