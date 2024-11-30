import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'

export default function AnalyticsPage() {
  const sampleData = [
    { name: "Sample A", value: 400 },
    { name: "Sample B", value: 300 },
    { name: "Sample C", value: 200 },
    { name: "Sample D", value: 100 }
  ]

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Codeforces Analytics Dashboard</h1>
      <p className="text-muted-foreground">
        Visualize and analyze Codeforces contest data with interactive charts and statistics.
      </p>
      <AnalyticsDashboard 
        data={sampleData}
        title="Contest Analytics"
        description="Overview of contest statistics"
      />
    </div>
  )
}
