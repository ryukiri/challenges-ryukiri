import React, { Component } from 'react';
import './App.css';

import Form from './Form';
import List from './List';
import WeatherCurrent from './WeatherCurrent';

// API key from https://openweathermap.org/
var OPEN_WEATHER_KEY = '3afb89ff3b34566750f8fdc7e145193c';

var STORAGE_KEY = 'todoList';

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
                                        name={this.state.name}
                                        weather={this.state.weather}
                                        weatherName={this.state.weatherName}
                                        weatherTemp={this.state.weatherTemp}
                                        weatherDesc={this.state.weatherDesc}
                                        maxTemp={this.state.maxTemp}
                                        minTemp={this.state.minTemp}
                                    />}
                                <div id="weather-error" className="alert alert-danger" role="alert"></div> 

                                <button id="saveButton" className="alert alert-danger mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Save</button>
                                
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="App">
                                    <List
                                        list={this.state.list}
                                        onItemRemoved={(item) => {
                                            this.handleItemRemoved(item);
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
        var maxTemp = document.getElementById('maxTemp');
        maxTemp.classList.remove('alert-danger');
        maxTemp.classList.add('active');

        var minTemp = document.getElementById('minTemp');
        minTemp.classList.remove('alert-danger');
        minTemp.classList.add('active');

        this.fetchWeather(itemToAdd);

        var saveButton = document.getElementById('saveButton');
        saveButton.classList.add('active');
        saveButton.addEventListener('click', function (e) {
            this.saveCity(itemToAdd);
        });
    }

    saveCity(itemToAdd) {
        var existingList = this.state.list;
        var newList = existingList.concat([ itemToAdd ]);

        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    }

    // Helper function to fetch weather for a specific query
    fetchWeather(query) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=' + OPEN_WEATHER_KEY;

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

                this.setState({
                    name: name,
                    weather: weather,
                    weatherName: weatherName,
                    weatherDesc: weatherDesc,
                    weatherTemp: temperature, 
                    minTemp: minTemp,
                    maxTemp: maxTemp,           
                    icon: icon
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
