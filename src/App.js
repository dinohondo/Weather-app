import { Container, Typography, Box, TextField, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import { useState,useEffect } from 'react';
function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'b0af67ca0a5993da6a5713b73a0099c3';

  const handleWeatherData = async (latitude, longitude) => {
    try {
      const weatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data.');
      }

      const data = await weatherResponse.json();
      
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error getting weather information. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data.');
      }

      const locationData = await response.json();
      
      if (locationData.length === 0) {
        console.error('City not found. Please enter a valid city name.', error);
        return;
      }

      const { lat, lon } = locationData[0];

      // Now you have the latitude and longitude, you can make a weather API call
      handleWeatherData(lat, lon);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError('Error getting location information. Please try again.');
    }
  };

  useEffect(() => {
    console.log(weatherData.list[0]);
  }, [weatherData]);

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth='xl'
        sx={{          padding: 4,
          gap: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              typography: { sm: 'h2', xs: 'h3' },
            }}
            variant='h1'
            gutterBottom
          >
            What's the weather like?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 1,justifyContent:'center',gap:2, }}>
            <TextField
            sx={{}}
              id='outlined-basic'
              label='In...'
              variant='outlined'
              onChange={(e) => setCity(e.target.value)}
              
            />
            <Button
              sx={{ maxWidth: 150 }}
              variant='outlined'
              endIcon={<SearchOutlinedIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Button
            sx={{ maxWidth: 150, maxHeight: 50 }}
            variant='outlined'
            endIcon={<PlaceIcon />}
          >
            Current location
          </Button>
        </Box>
        {weatherData && (
          <Box>
            {weatherData.list.map((item) => (
              <Box key={item.dt}>
                <Typography variant="h6">
                  Date and Time: {item.dt_txt}
                </Typography>
                <Typography>Temperature: {item.main.temp} K</Typography>
                <Typography>Weather: {item.weather[0].description}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
