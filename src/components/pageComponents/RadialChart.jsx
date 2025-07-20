import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTheme } from "../context/ThemeContext";
import React from "react";

const data = [
  { name: "Direct", value: 300.56 },
  { name: "Affiliate", value: 135.18 },
  { name: "Sponsored", value: 154.02 },
  { name: "E-mail", value: 48.96 },
];

const COLORS = ["#000000", "#B5EAD7", "#A0C4FF", "#D0F0FF"];

const CustomRadialTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((dataItem.value / total) * 100).toFixed(1);

    return (
      <div className='bg-background dark:bg-card-grey p-2 rounded-md shadow-sm border border-border text-xs'>
        <p className='font-medium text-foreground'>{dataItem.name}</p>
        <div className='flex flex-col justify-start gap-1 mt-0.5'>
          <div className='text-muted-foreground'>
            Amount: ${dataItem.value.toFixed(2)}
          </div>
          <div className='font-medium text-muted-foreground dark:text-foreground'>
            Percentage: {percentage}%
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RadialChart = React.memo(() => {
  const { theme } = useTheme();

  return (
    <Card className='w-full h-full p-4 bg-primary dark:bg-card-grey rounded-[16px] border-none flex flex-col'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base font-semibold'>Total Sales</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col justify-between flex-grow p-0'>
        {/* Chart Area */}
        <div className='flex-grow flex items-center justify-center min-h-[180px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={3}
                dataKey='value'
                labelLine={false}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing='ease-in-out'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      theme === "dark" && COLORS[index] === "#000000"
                        ? "#C6C7F8"
                        : COLORS[index]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomRadialTooltip />}
                formatter={(value) => `$${value.toFixed(2)}`}
                className='bg-primary dark:bg-card-grey border-5'
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className='mt-4 space-y-2 text-sm'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <span
                  className='inline-block w-2 h-2 rounded-full'
                  style={{
                    backgroundColor:
                      theme === "dark" && COLORS[index] === "#000000"
                        ? "#C6C7F8"
                        : COLORS[index],
                  }}
                />
                <span className='text-muted-foreground'>{item.name}</span>
              </div>
              <span className='font-medium'>${item.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default RadialChart;
