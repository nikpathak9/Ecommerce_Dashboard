import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StatsCards from "./StatsCards";
import ChartSection from "./ChartSection";
import LineChartSection from "./LineChartSection";
import InfoWithMap from "./InfoWithMap";
import TopSelling from "./TopSelling";
import RadialChart from "./RadialChart";
import { Skeleton } from "@/components/ui/skeleton";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className='flex flex-col flex-grow h-screen overflow-hidden'>
      <div className='flex-grow p-4 overflow-y-auto w-full'>
        <h1 className='text-xl text-black dark:text-white font-bold'>
          e-Commerce
        </h1>

        <div className='flex flex-col lg:flex-row gap-6 mt-4 p-4 w-full'>
          <div className='flex flex-col gap-6 lg:w-1/2 h-full'>
            {isLoading ? <Skeleton className='w-full h-64' /> : <StatsCards />}
          </div>
          {isLoading ? (
            <Skeleton className='w-full h-64 lg:w-1/2' />
          ) : (
            <ChartSection />
          )}
        </div>

        <div className='flex flex-wrap lg:flex-nowrap gap-6 mt-4 px-4 w-full'>
          {isLoading ? (
            <>
              <Skeleton className='w-full lg:w-[75%] h-64' />
              <Skeleton className='w-full lg:w-[25%] h-64' />
            </>
          ) : (
            <>
              <div className='w-full lg:w-[75%] min-w-[200px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'>
                <LineChartSection className='w-full h-64' />
              </div>
              <div className='w-full lg:w-[25%] min-w-[250px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'>
                <InfoWithMap />
              </div>
            </>
          )}
        </div>

        <div className='flex flex-col lg:flex-row gap-6 mt-4 px-4 w-full'>
          {isLoading ? (
            <>
              <Skeleton className='w-full lg:w-[75%] h-[400px]' />
              <Skeleton className='w-full lg:w-[25%] h-[400px]' />
            </>
          ) : (
            <>
              <div className='w-full lg:w-[75%] h-[400px] min-w-[200px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'>
                <TopSelling />
              </div>
              <div className='w-full lg:w-[25%] h-[400px] min-w-[200px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'>
                <RadialChart />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
