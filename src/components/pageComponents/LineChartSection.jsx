import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "../context/ThemeContext";
import { ChartContainer } from "@/components/ui/chart";
import React from "react";

const chartData = [
  { month: "January", previousWeek: 80, currentWeek: 120 },
  { month: "February", previousWeek: 150, currentWeek: 80 },
  { month: "March", previousWeek: 130, currentWeek: 100 },
  { month: "April", previousWeek: 90, currentWeek: 150 },
  { month: "May", previousWeek: 120, currentWeek: 200 },
  { month: "June", previousWeek: 280, currentWeek: 180 },
];

const chartConfig = {
  currentWeek: {
    label: "Current Week",
    color: "#1C1C1C",
    value: "$58,211",
  },
  previousWeek: {
    label: "Previous Week",
    color: "#A8C5DA",
    value: "$68,768",
  },
};

{
  /* Custom Tooltip */
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-primary dark:bg-card-grey p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
        <p className='font-semibold text-gray-900 dark:text-white'>{label}</p>
        <div className='flex flex-col gap-1'>
          {payload.map((item, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor:
                    item.color ||
                    (item.dataKey === "currentWeek"
                      ? chartConfig.currentWeek.color
                      : chartConfig.previousWeek.color),
                }}
              />
              <span className='text-gray-600 dark:text-gray-300'>
                {item.dataKey === "currentWeek"
                  ? "Current Week"
                  : "Previous Week"}
                :
              </span>
              <span className='font-medium text-gray-900 dark:text-white'>
                {item.value}M
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const LineChartSection = React.memo(() => {
  const { theme } = useTheme();

  return (
    <div className='w-full h-[400px] bg-primary dark:bg-card-grey rounded-[16px] p-10 max-md:p-4 flex flex-col justify-between'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-4'>
          <h2 className='text-base font-semibold dark:text-white'>Revenue</h2>
          <div className='h-4 border-l border-gray-300 dark:border-gray-600' />
          <div className='flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 text-sm max-md:text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <span
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor: theme === "dark" ? "#C6C7F8" : "#1C1C1C",
                }}
              />
              <span className='dark:text-white'>
                {chartConfig.currentWeek.label}
              </span>
              <span className='font-semibold text-black dark:text-white'>
                {chartConfig.currentWeek.value}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <span
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: chartConfig.previousWeek.color }}
              />
              <span className='dark:text-white'>
                {chartConfig.previousWeek.label}
              </span>
              <span className='font-semibold text-black dark:text-white'>
                {chartConfig.previousWeek.value}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card className='w-full h-full flex-grow shadow-none border-none bg-transparent'>
        <CardContent className='p-0 h-full'>
          <ChartContainer config={chartConfig} className='w-full h-full'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                // key={keyInt}
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray='3 3'
                  stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                  tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}M`}
                  tickMargin={8}
                  tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 1000 }}
                />
                <Line
                  dataKey='currentWeek'
                  type='monotone'
                  stroke={theme === "dark" ? "#C6C7F8" : "#1C1C1C"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: theme === "dark" ? "#C6C7F8" : "#1C1C1C",
                    fill: theme === "dark" ? "#1b1c1b" : "#FFFFFF",
                  }}
                />
                <Line
                  dataKey='previousWeek'
                  type='monotone'
                  stroke='#A8C5DA'
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#A8C5DA",
                    fill: theme === "dark" ? "#1b1c1b" : "#FFFFFF",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
});

export default LineChartSection;
