import ContestDashboard from '@/components/ContestDashboard'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Codeforces Contest Dashboard</h1>
      <p className="text-muted-foreground">
        Explore and analyze Codeforces contests with our interactive dashboard.
      </p>
      <ContestDashboard />
    </div>
  )
}

