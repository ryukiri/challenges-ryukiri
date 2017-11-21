import React, { Component } from 'react';
var STORAGE_KEY = 'todoList';

class WeatherCurrent extends Component {
    render() { 
        return (
            <div>
                <h3 id="nameHead"><span id="name">{this.props.name}</span></h3>
                <img id="icon" className="alert-danger" src={this.props.icon} alt="Weather Icon"/>
                <span id="temp" className="alert-danger">{this.props.weatherTemp}&#176;</span>
                <span id="weather" className="alert-danger">{this.props.weatherName}&#176;</span>
                <span id="weatherDesc" className="alert-danger"> {this.props.weatherDesc}&#176;</span>
                <p id="maxTemp" className="alert-danger">High: {this.props.maxTemp}</p>
                <p id="minTemp" className="alert-danger">Low: {this.props.minTemp}</p>
                <p id="sunrise" className="alert-danger">Sunrise: {this.props.sunrise}</p>
                <p id="sunset" className="alert-danger">Sunset: {this.props.sunset}</p>
                <p id="humidity" className="alert-danger">Humidity: {this.props.humidity}%</p>
            </div>                               
        )
    }
}

export default WeatherCurrent;