import {
  ResponsiveContainer,
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Legend,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RadialBarChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
];

export function RadialBarChart({ data }: RadialBarChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Count",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          <RadialBar
            // minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </RadialBar>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
