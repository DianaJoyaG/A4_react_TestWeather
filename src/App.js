import React from 'react';
import WeatherApp from './components/WeatherApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  // Create a theme instance.
  const theme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#red',
      },
      background: {
        default: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <WeatherApp />
      </div>
    </ThemeProvider>

  );
}

export default App;
