import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  const mockWeather = {
    main: {
      temp: 20,
      humidity: 50
    },
    weather: [{
      main: 'Cloudy',
      icon: '04d'
    }],
    name: 'Berlin'
  };
  
  it('renders correctly with provided weather data', () => {
    render(<WeatherCard weather={mockWeather} />);
    
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 50%')).toBeInTheDocument();
    
    expect(screen.getByRole('img')).toHaveAttribute('src', `http://openweathermap.org/img/wn/${mockWeather.weather[0].icon}.png`);
  });

});
