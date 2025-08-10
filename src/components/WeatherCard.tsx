import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity?: number;
  windSpeed?: number;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const iconProps = { size: 64, className: "text-white drop-shadow-lg" };
  
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return <Sun {...iconProps} />;
    case 'clouds':
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'rain':
    case 'drizzle':
      return <CloudRain {...iconProps} />;
    case 'snow':
      return <CloudSnow {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
};

const getWeatherGradient = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return 'var(--gradient-sunny)';
    case 'clouds':
    case 'cloudy':
      return 'var(--gradient-cloudy)';
    case 'rain':
    case 'drizzle':
      return 'var(--gradient-rainy)';
    default:
      return 'var(--gradient-sky)';
  }
};

export function WeatherCard({ weather }: WeatherCardProps) {
  const gradient = getWeatherGradient(weather.condition);

  return (
    <Card 
      className="overflow-hidden border-0 text-white shadow-lg"
      style={{ background: gradient }}
    >
      <div className="p-8">
        <div className="text-center space-y-6">
          {/* Location */}
          <div>
            <h2 className="text-2xl font-bold">
              {weather.city}
            </h2>
            {weather.country !== 'Demo' && (
              <p className="text-white/80 text-sm">
                {weather.country}
              </p>
            )}
          </div>

          {/* Weather Icon */}
          <div className="flex justify-center">
            {getWeatherIcon(weather.condition)}
          </div>

          {/* Temperature */}
          <div>
            <div className="text-6xl font-light mb-2">
              {Math.round(weather.temperature)}°
            </div>
            <p className="text-xl text-white/90 capitalize">
              {weather.description}
            </p>
          </div>

          {/* Additional Info */}
          {(weather.humidity || weather.windSpeed) && (
            <div className="flex justify-center space-x-8 pt-4 border-t border-white/20">
              {weather.humidity && (
                <div className="text-center">
                  <p className="text-white/70 text-sm">Humidity</p>
                  <p className="text-lg font-medium">{weather.humidity}%</p>
                </div>
              )}
              {weather.windSpeed && (
                <div className="text-center flex items-center space-x-1">
                  <Wind size={16} className="text-white/70" />
                  <div>
                    <p className="text-white/70 text-sm">Wind</p>
                    <p className="text-lg font-medium">{weather.windSpeed} m/s</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}