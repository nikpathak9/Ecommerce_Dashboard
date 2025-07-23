import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const StatsCards = () => {
  const stats = [
    {
      title: "Customers",
      value: 3781,
      change: "+11.01%",
      bg: "#E3F5FF",
      icon: <TrendingUp className='w-4 h-4' />,
    },
    {
      title: "Orders",
      value: 1219,
      change: "-0.03%",
      bg: "#F7F9FB",
      icon: <TrendingDown className='w-4 h-4 transform scale-x-[-1]' />,
    },
    {
      title: "Revenue",
      value: 695,
      change: "+15.03%",
      bg: "#F7F9FB",
      icon: <TrendingUp className='w-4 h-4' />,
    },
    {
      title: "Growth",
      value: 30.01,
      change: "+6.08%",
      bg: "#E5ECF6",
      icon: <TrendingUp className='w-4 h-4' />,
    },
  ];

  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const { theme } = useTheme();

  useEffect(() => {
    const duration = 1700;
    const startTime = performance.now();
    const increments = stats.map((stat) => stat.value / (duration / 16));

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedValues((prev) =>
        prev.map((val, i) => {
          if (progress < 1) {
            return Math.min(val + increments[i], stats[i].value);
          }
          return stats[i].value;
        })
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const formatNumber = (value, index) => {
    if (index === 3) return value.toFixed(2) + "%";
    if (index === 2) return "$" + Math.floor(value).toLocaleString();
    return Math.floor(value).toLocaleString();
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
      {/* Stats Cards on the Home Page */}
      {stats.map((item, i) => (
        <div
          key={i}
          className='flex flex-col p-4 rounded-xl h-[150px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'
          style={{
            backgroundColor:
              item.bg === "#F7F9FB" && theme === "dark" ? "#272827" : item.bg,
            color:
              item.bg === "#F7F9FB" && theme === "dark" ? "white" : "black",
          }}
        >
          <h2 className='font-semibold text-sm'>{item.title}</h2>
          <div className='flex-grow flex flex-col justify-center'>
            <div className='flex justify-between items-center w-full gap-2'>
              <p className='text-xl max-md:text-2xl font-semibold break-words'>
                {formatNumber(animatedValues[i], i)}
              </p>
              <span className='flex items-center gap-2 text-xs max-md:text-2xs'>
                {item.change} {item.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
