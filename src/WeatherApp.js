import './WeatherApp.css';
import axios from "axios";
import {Component} from "react";
import moment from "moment";


class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.setResults = this.setResults.bind(this);
        this.todaysDate = this.todaysDate.bind(this);
        this.updateQ = this.updateQ.bind(this);
        this.state = {
            api_key: "15b3f19133d81f3d08c0f4d62c8f5097",
            url_base: "https://api.openweathermap.org/data/2.5/",
            icon_url: "http://openweathermap.org/img/wn/",
            weather_icon: "",
            query: "",
            weather: {},
            weather_info: undefined
        }
    }


    async fetchWeather(e) {
        if (e.key === "Enter") {
            console.log(this.state.url_base);
            let response = await axios.get(this.state.url_base + "weather?q=" + this.state.query + "&units=metric&APPID=" + this.state.api_key);
            this.setResults(response.data);
            console.log(response)
        }
    };

    updateQ(e) {
        this.setState({query: e.target.value})
    }

    setResults(response) {
        this.setState({weather: response});
        this.setState({weather_icon: this.state.icon_url + response.weather[0].icon + ".png"});
        this.setState({
            weather_info: <div className="weather-info">
                <div className="location-box">
                    <div className="location">{this.state.weather.name},{this.state.weather.sys.country}
                    </div>
                    <div className="date">{this.todaysDate(response.timezone)}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">{Math.round(this.state.weather.main.temp)}°c</div>
                    <div className="weather">{this.state.weather.weather[0].main}</div>
                    <div className="icon">
                        <img src={this.state.weather_icon} alt=""/>
                    </div>
                </div>
            </div>
        });
    };

    todaysDate(offset) {
        let month = moment().utcOffset((offset) / 60).format("MMM");
        let day = moment().utcOffset((offset) / 60).format("ddd");
        let date = moment().utcOffset((offset) / 60).format("D");
        let year = moment().utcOffset((offset) / 60).format("YYYY");
        let time = moment().utcOffset((offset) / 60).format("h:mm A");
        console.log(moment())
        return `${day}, ${month} ${date} ${year}, ${time}`;
    };

    render() {
        return (
            <div className="weather-container">
                <div className="weather-wrap">
                    <div className="search-box">
                        <input type="text" placeholder="Search..." className="search-bar"
                               value={this.query} onKeyPress={this.fetchWeather} onChange={this.updateQ}/>
                    </div>
                    {this.state.weather_info}
                </div>
            </div>
        );
    }
}

export default WeatherApp;
