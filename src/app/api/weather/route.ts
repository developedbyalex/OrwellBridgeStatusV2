import { NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather';
import { cache } from '@/lib/cache';

export async function GET() {
  try {
    const cachedWeather = cache.get<{temperature: number, windSpeed: number, windDirection: number, description: string, icon: string}>('weather-data');
    if (cachedWeather) {
      return NextResponse.json({
        success: true,
        data: cachedWeather,
        cached: true
      });
    }

    const weatherData = await getWeatherData();

    cache.set('weather-data', weatherData, 900);

    return NextResponse.json({
      success: true,
      data: weatherData,
      realTime: true,
      current: {
        temp_c: weatherData.temperature,
        wind_mph: weatherData.windSpeed,
        condition: {
          text: weatherData.description,
          icon: weatherData.icon
        }
      }
    });

  } catch (error) {
    console.error('Weather API error:', error);

    const cachedWeather = cache.get<{temperature: number, windSpeed: number, windDirection: number, description: string, icon: string}>('weather-data');
    if (cachedWeather) {
      return NextResponse.json({
        success: true,
        data: cachedWeather,
        fallback: true,
        cached: true
      });
    }

    const fallbackData = {
      temperature: 12,
      windSpeed: 25,
      windDirection: 270,
      description: 'Weather unavailable',
      icon: '❓'
    };

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch weather data',
      data: fallbackData,
      current: {
        temp_c: fallbackData.temperature,
        wind_mph: fallbackData.windSpeed,
        condition: {
          text: fallbackData.description,
          icon: fallbackData.icon
        }
      }
    });
  }
}