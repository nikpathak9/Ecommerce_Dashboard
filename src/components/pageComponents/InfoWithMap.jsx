import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Progress } from "@/components/ui/progress";

const cityData = [
  {
    name: "New York",
    value: 72,
    progress: 80,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: "San Francisco",
    value: 39,
    progress: 39,
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    name: "Sydney",
    value: 25,
    progress: 25,
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    name: "Singapore",
    value: 61,
    progress: 61,
    lat: 1.3521,
    lng: 103.8198,
  },
];

const InfoWithMap = () => {
  const [animatedProgress, setAnimatedProgress] = useState(
    cityData.map(() => 0)
  );

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    let animationFrameId = null;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const newProgress = cityData.map((city) => {
        const currentValue = easedProgress * city.progress;
        return progress === 1 ? city.progress : currentValue;
      });

      setAnimatedProgress(newProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  return (
    <div className='w-full h-[400px] flex flex-col gap-4 max-md:p-6 p-4 bg-primary dark:bg-card-grey rounded-lg border-none'>
      <h2 className='text-base font-semibold'>Revenue By Location</h2>
      <MapContainer
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        className='w-full h-[150px] md:h-[180px] lg:h-[200px] rounded-md bg-transparent z-0'
        zoomControl={false}
      >
        <TileLayer url='https://basemaps.cartocdn.com/rastertiles/voyager_no_buildings/{z}/{x}/{y}.png' />
        {cityData.map((city, index) => (
          <CircleMarker
            key={index}
            center={[city.lat, city.lng]}
            radius={4}
            pathOptions={{ color: "black", fillColor: "black", fillOpacity: 1 }}
          >
            <Tooltip>
              {city.name}: {city.value}K
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {cityData.map((city, index) => (
        <div key={index} className='flex flex-col gap-2'>
          <div className='flex justify-between text-sm'>
            <p>{city.name}</p>
            <p>{city.value} K</p>
          </div>
          <Progress
            value={animatedProgress[index]}
            className='w-full h-1 bg-gray-200 [&>*]:bg-secondary transition-all duration-100 ease-out'
          />
        </div>
      ))}
    </div>
  );
};

export default InfoWithMap;
