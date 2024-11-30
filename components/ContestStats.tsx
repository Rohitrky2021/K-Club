import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Award, BarChart } from 'lucide-react'
import { Contest } from '@/types/contest'

interface ContestStatsProps {
  contests: Contest[]
}

export default function ContestStats({ contests }: ContestStatsProps) {
  const totalContests = contests.length
  const averageDuration = Math.round(
    contests.reduce((sum, contest) => sum + contest.durationSeconds, 0) / totalContests / 3600
  )
  const upcomingContests = contests.filter(contest => contest.phase === 'BEFORE').length
  const averageDifficulty = Math.round(
    contests.reduce((sum) => sum + (Math.random() * 10), 0) / totalContests
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Contests</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalContests}</div>
          <p className="text-xs text-muted-foreground">
            +20% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageDuration} hours</div>
          <p className="text-xs text-muted-foreground">
            -2 hours from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Contests</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingContests}</div>
          <p className="text-xs text-muted-foreground">
            +5 from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Difficulty</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageDifficulty}/10</div>
          <p className="text-xs text-muted-foreground">
            +0.5 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

