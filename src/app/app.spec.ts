import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { WeatherService } from './services/weather';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgIf } from '@angular/common';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let mockWeatherService: any;

  beforeEach(() => {
    mockWeatherService = {
      getWeather: jasmine.createSpy('getWeather').and.returnValue(
        of({
          name: 'Riyadh',
          weather: [{ description: 'صافي', icon: '01d' }],
          main: { temp: 30, humidity: 20 },
          wind: { speed: 5 }
        })
      )
    };

    TestBed.configureTestingModule({
      imports: [App, FormsModule, HttpClientTestingModule, NgIf],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should fetch weather on getWeather()', () => {
    component.city.set('Riyadh');
    component.getWeather();

    expect(mockWeatherService.getWeather).toHaveBeenCalledWith('Riyadh');
    expect(component.weatherData().name).toBe('Riyadh');
  });
});
