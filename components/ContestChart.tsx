'use client'
import { Contest } from '@/types/contest'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface ContestChartProps {
  contests: Contest[]
}

export default function ContestChart({ contests }: ContestChartProps) {
  const chartData = contests
    .slice(0, 20)  // Limit to 20 contests for better visibility
    .map((contest) => ({
      name: contest.name.slice(0, 20) + (contest.name.length > 20 ? '...' : ''),  // Truncate long names
      duration: Math.floor(contest.durationSeconds / 3600),
      type: contest.type,
    }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contest Duration Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            duration: {
              label: 'Duration (hours)',
              color: 'hsl(var(--primary))',
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                height={80} 
                tick={{ fontSize: 12 }}
              />
              <YAxis unit=" hrs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="duration" fill="var(--color-duration)" name="Duration" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

