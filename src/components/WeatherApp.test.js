import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import WeatherApp from './WeatherApp'; 

jest.mock('axios');

describe('WeatherApp', () => {
  test('renders the input field and button', () => {
    render(<WeatherApp />);
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get weather/i })).toBeInTheDocument();
  });

  test('allows typing in the city input field', () => { 
    render(<WeatherApp />);
    userEvent.type(screen.getByLabelText(/city/i), 'London');
    expect(screen.getByLabelText(/city/i)).toHaveValue('London');
  });

  test('fetches weather data on button click and displays it', async () => {
    axios.get.mockResolvedValue({
      data: {
        main: { temp: 20 },
        weather: [{ main: 'Cloudy' }],
        name: 'London',
      },
    });

    render(<WeatherApp />);
    userEvent.type(screen.getByLabelText(/city/i), 'London');
    userEvent.click(screen.getByRole('button', { name: /get weather/i }));

    await waitFor(() => {
      expect(screen.getByText(/cloudy/i)).toBeInTheDocument();
    });
  });

  test('displays an error message when the API call fails', async () => {
    axios.get.mockRejectedValue(new Error('Error, try again later'));

    render(<WeatherApp />);
    await act(async () => {
        await userEvent.type(screen.getByLabelText(/city/i), 'Unknown');
        await userEvent.click(screen.getByRole('button', { name: /get weather/i }));
    });
      
    await waitFor(() => {
      expect(screen.getByText(/error, try again later/i)).toBeInTheDocument();
    });
});
});
