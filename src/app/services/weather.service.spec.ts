import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending requests remain
  });

  it('should fetch weather data for a city', () => {
    const dummyWeather = {
      name: 'Riyadh',
      weather: [{ description: 'صافي', icon: '01d' }],
      main: { temp: 30, humidity: 20 },
      wind: { speed: 5 }
    };

    service.getWeather('Riyadh').subscribe(data => {
      expect(data).toEqual(dummyWeather);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('Riyadh') && request.url.includes('appid=')
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyWeather); // Simulate backend response
  });
});
