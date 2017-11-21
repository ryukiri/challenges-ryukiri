import React, { Component } from 'react';
var STORAGE_KEY = 'todoList';

class WeatherCurrent extends Component {
    render() { 
        return (
            <div>
                <h3 id="nameHead"><span id="name">{this.props.name}</span></h3>
                <span id="temp">{this.props.weatherTemp}</span>
                <span id="weather">{this.props.weatherName}</span>
                <span id="weatherDesc"> {this.props.weatherDesc} </span>
                <p id="maxTemp" className="alert-danger">High: {this.props.maxTemp}</p>
                <p id="minTemp" className="alert-danger">Low: {this.props.minTemp}</p>
            </div>                               
        )
    }
}

export default WeatherCurrent;