import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity?: number;
  windSpeed?: number;
}

const API_KEY = 'demo_key'; // Users will need to replace this with their OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll simulate API response
      // In a real app, uncomment the fetch call below and use a real API key
      
      // const response = await fetch(
      //   `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      // );
      
      // if (!response.ok) {
      //   throw new Error('City not found');
      // }
      
      // const data = await response.json();
      
      // Simulated response for demo
      setTimeout(() => {
        const demoData: WeatherData = {
          city: city,
          country: 'Demo',
          temperature: Math.floor(Math.random() * 30) + 5,
          condition: ['clear', 'clouds', 'rain'][Math.floor(Math.random() * 3)],
          description: ['sunny', 'partly cloudy', 'light rain'][Math.floor(Math.random() * 3)],
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 10) + 2,
        };
        
        setWeather(demoData);
        setIsLoading(false);
        
        toast({
          title: "Weather fetched successfully!",
          description: `Showing demo data for ${city}. Add your OpenWeatherMap API key for real data.`,
        });
      }, 1000);
      
      // For real API implementation:
      // setWeather({
      //   city: data.name,
      //   country: data.sys.country,
      //   temperature: data.main.temp,
      //   condition: data.weather[0].main,
      //   description: data.weather[0].description,
      //   humidity: data.main.humidity,
      //   windSpeed: data.wind.speed,
      // });
      
    } catch (error) {
      toast({
        title: "Failed to fetch weather",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return {
    weather,
    isLoading,
    fetchWeather,
  };
}