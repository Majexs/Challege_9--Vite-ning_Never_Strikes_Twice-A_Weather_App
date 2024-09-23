import dotenv from 'dotenv';
dotenv.config();
import dayjs from 'dayjs';

interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

class Weather {
  city: string;
  date: string;
  tempF: string;
  windSpeed: string;
  humidity: string;
  icon: string;
  iconDescription: string;

  constructor (city: string, date: string, tempF: string, windSpeed: string, humidity: string, icon: string, iconDescription: string) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL?: string;
  private API_KEY?: string;
  private city = '';

  constructor () {
    this.baseURL = process.env.API_BASE_URL || '';
    this.API_KEY = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
        const response: Coordinates[] = await fetch(query).then((res) =>
          res.json()
        );
        return response[0];
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates) {
    const { name, lat, lon } = locationData;
    const coordinates: Coordinates = {
      name,
      lat,
      lon,
    };
    return coordinates;
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const geocodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.API_KEY}`;
    return geocodeQuery;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const buildWeatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_KEY}`;
    return buildWeatherQuery;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) =>
      this.destructureLocationData(data)
    );
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates)).then(
        (res) => res.json()
      );
      if (!response) {
        throw new Error('Weather data not found');
      }
      const currentWeather: Weather = this.parseCurrentWeather(
        response.list[0]
      );
      const forecast: Weather[] = this.buildForecastArray(
        currentWeather,
        response.list
      );
      return forecast;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  
  }
  // // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const parsedDate = dayjs.unix(response.dt).format('M/D/YYYY');
    const currentWeather = new Weather(
      this.city,
      parsedDate,
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].description || response.weather[0].main
    );
    return currentWeather;
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather];
    const filteredWeatherData = weatherData.filter((data: any) => {
      return data.dt_txt.includes('12:00:00');
    });
    for (const day of filteredWeatherData) {
      weatherForecast.push(
        new Weather(
          this.city,
          dayjs.unix(day.dt).format('M/D/YYYY'),
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description || day.weather[0].main
        )
      );
    }
    return weatherForecast;
  }
  // // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      this.city = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      if (coordinates) {
        const weather = await this.fetchWeatherData(coordinates);
        return weather;
      }
      throw new Error('Weather data not found');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new WeatherService();