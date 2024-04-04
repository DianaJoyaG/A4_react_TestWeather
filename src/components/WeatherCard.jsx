import { Card, CardContent, Grid, Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { styled } from '@mui/system';
import chroma from 'chroma-js';

const scale = chroma.scale(['blue', 'white', 'red']).mode('lch');
const WeatherIcon = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(9),
  height: theme.spacing(9),
  margin: 'auto',
}));

const WeatherCard = ({ weather }) => {
  const temperature = weather.main.temp;
  const cardColor = scale((temperature + 40) / 100).hex();
  return (
    <Card style={{backgroundColor: cardColor}}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WeatherIcon src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            {weather.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {weather.weather[0].main}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
            <Typography variant="h6">
              {weather.main.temp}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Humidity: {weather.main.humidity}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default WeatherCard;