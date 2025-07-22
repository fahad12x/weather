import { Component, signal } from '@angular/core';
import { WeatherService } from './services/weather';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  city = signal('Riyadh');
  weatherData = signal<any>(null);

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city()).subscribe(data => {
      this.weatherData.set(data);
    }, err => {
      this.weatherData.set(null);
      alert('لم يتم العثور على المدينة');
    });
  }
}
