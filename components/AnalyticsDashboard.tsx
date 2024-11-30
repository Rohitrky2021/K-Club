'use client';

import { AreaChart } from './AreaChart'
import { BarChart } from './BarChart'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { RadarChart } from './RadarChart'
import { RadialBarChart } from './RadialBarChart'

interface AnalyticsDashboardProps {
  data: { name: string; value: number }[]
  title: string
  description: string
}

export function AnalyticsDashboard({ data, title, description }: AnalyticsDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 border w-full">
      <AreaChart data={data} title={title} description={description} />
      <BarChart data={data} title={title} description={description} />
      <LineChart data={data} title={title} description={description} />
      <PieChart data={data} title={title} description={description} />
      <RadarChart data={data} />
      <RadialBarChart data={data} />
    </div>
  )
}

export default AnalyticsDashboard