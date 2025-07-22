import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.weatherApiKey;  // Put your OpenWeatherMap API key here
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}&lang=ar`);
  }
}
