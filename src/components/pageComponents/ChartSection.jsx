import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const chartData = [
  { month: "Jan", actual: 186, projection: 80 },
  { month: "Feb", actual: 305, projection: 200 },
  { month: "Mar", actual: 200, projection: 100 },
  { month: "Apr", actual: 105, projection: 242 },
  { month: "May", actual: 305, projection: 200 },
  { month: "Jun", actual: 321, projection: 123 },
];

const chartConfig = {
  actual: {
    label: "Actual",
    color: "#A8C5DA",
  },
  projection: {
    label: "Projection",
    color: "#cddfea",
  },
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background dark:bg-card-grey p-2 rounded-md shadow-sm border border-border text-xs'>
        <p className='font-medium text-foreground mb-1'>{label}</p>
        <div className='flex flex-col gap-1'>
          {payload.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-2'
            >
              <div className='flex items-center gap-1.5'>
                <div
                  className='w-2 h-2 rounded-full flex-shrink-0'
                  style={{ backgroundColor: item.color }}
                />
                <span className='text-muted-foreground'>
                  {item.name === "actual" ? "Actual" : "Projection"}
                </span>
              </div>
              <span className='font-medium text-foreground'>
                {item.name === "projection" ? "+" + item.value : item.value}M
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const ChartSection = React.memo(() => {
  return (
    <div className='lg:w-1/2 w-full bg-primary dark:bg-card-grey rounded-[16px] p-4 flex flex-col justify-between h-[320px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer'>
      <h2 className='text-lg font-semibold mb-2'>Projections vs Actual</h2>
      <Card className='w-full h-full flex-grow shadow-none border-none bg-transparent'>
        <CardContent className='p-0 h-full'>
          <ChartContainer
            config={chartConfig}
            style={{
              "--color-actual": "#A8C5DA",
              "--color-projection": "#CDDfea",
            }}
            className='w-full h-full'
          >
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `${value}M`}
              />
              <ChartTooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey='actual'
                stackId='a'
                fill='var(--color-actual)'
                radius={[0, 0, 4, 4]}
                barSize={50}
                animationDuration={1200}
                animationEasing='ease-in-out'
              />
              <Bar
                dataKey='projection'
                stackId='a'
                fill='var(--color-projection)'
                radius={[4, 4, 0, 0]}
                barSize={50}
                animationDuration={1200}
                animationEasing='ease-in-out'
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
});

export default ChartSection;
