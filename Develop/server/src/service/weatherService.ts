import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {

}
// TODO: Define a class for the Weather object
class Weather {

}
// TODO: Complete the WeatherService class
class WeatherService {
  baseURL: string;
  API_KEY: string;
  city: string;

  constructor (baseURL: string, API_KEY: string, city: string) {
    this.baseURL = baseURL;
    this.API_KEY = API_KEY;
    this.city = city;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {}

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {}

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {}

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {}

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();
