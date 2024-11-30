import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface RadarChartProps {
  data: { name: string; value: number }[]
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: 'Count',
          color: 'hsl(var(--primary))',
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar name="Value" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

