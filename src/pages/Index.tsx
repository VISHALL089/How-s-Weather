import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";
import { Cloud } from "lucide-react";

const Index = () => {
  const { weather, isLoading, fetchWeather } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-sky-from to-weather-sky-to relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="absolute top-10 right-10 opacity-10">
        <Cloud size={200} className="text-white" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <Cloud size={150} className="text-white" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4 drop-shadow-lg">
              Weather App
            </h1>
            <p className="text-xl text-white/80 drop-shadow">
              Get instant weather updates for any city
            </p>
          </div>

          {/* Search */}
          <WeatherSearch onSearch={fetchWeather} isLoading={isLoading} />

          {/* Weather Display */}
          <div className="flex justify-center">
            {isLoading && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
                <p>Fetching weather data...</p>
              </div>
            )}
            
            {weather && !isLoading && (
              <div className="w-full max-w-md">
                <WeatherCard weather={weather} />
              </div>
            )}
            
            {!weather && !isLoading && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center text-white border border-white/20">
                <Cloud size={48} className="mx-auto mb-4 text-white/60" />
                <p className="text-lg font-medium mb-2">Ready to check the weather?</p>
                <p className="text-white/70">Enter a city name above to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
