import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      toast({
        title: "Please enter a city name",
        variant: "destructive"
      });
      return;
    }
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-12 pr-16 h-14 text-lg bg-white/90 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-300"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-primary hover:bg-primary/90 shadow-md"
        >
          <Search size={16} />
        </Button>
      </div>
    </form>
  );
}