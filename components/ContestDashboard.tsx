'use client'

import { useState, useEffect } from 'react'
import { Contest } from '@/types/contest'
import ContestList from './ContestList'
import { BarChart } from './BarChart'
import { AreaChart } from './AreaChart'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import ContestStats from './ContestStats'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

export default function ContestDashboard() {
  const [contests, setContests] = useState<Contest[]>([])
  const [filteredContests, setFilteredContests] = useState<Contest[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [phaseFilter, setPhaseFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('all')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    fetchContests()
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const fetchContests = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://codeforces.com/api/contest.list')
      if (!response.ok) {
        throw new Error('Failed to fetch contests')
      }
      const data = await response.json()
      setContests(data.result)
      setFilteredContests(data.result)
    } catch (error) {
      console.error('Error fetching contests:', error)
      setError('Failed to load contests. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const filtered = contests.filter((contest) => {
      const nameMatch = contest.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const typeMatch = typeFilter === 'ALL' || contest.type === typeFilter
      const phaseMatch = phaseFilter === 'ALL' || contest.phase === phaseFilter
      const favoriteMatch = activeTab === 'favorites' ? favorites.includes(contest.id) : true
      return nameMatch && typeMatch && phaseMatch && favoriteMatch
    })
    setFilteredContests(filtered)
    setCurrentPage(1)
  }, [contests, debouncedSearchTerm, typeFilter, phaseFilter, favorites, activeTab])

  const pageCount = Math.ceil(filteredContests.length / itemsPerPage)
  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  const contestsByType = contests.reduce((acc, contest) => {
    acc[contest.type] = (acc[contest.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const contestTypeData = Object.entries(contestsByType).map(([name, value]) => ({ name, value }))

  const contestsByPhase = contests.reduce((acc, contest) => {
    acc[contest.phase] = (acc[contest.phase] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const contestPhaseData = Object.entries(contestsByPhase).map(([name, value]) => ({ name, value }))

  const contestDurations = contests.map(contest => ({
    name: contest.name.slice(0, 20) + (contest.name.length > 20 ? '...' : ''),
    value: Math.floor(contest.durationSeconds / 3600)
  })).slice(0, 20)

  const contestParticipants = contests
    .filter(contest => contest.phase === 'FINISHED')
    .map(contest => ({
      name: contest.name.slice(0, 20) + (contest.name.length > 20 ? '...' : ''),
      value: contest.participantCount || 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <ContestStats contests={contests} />
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down the contests based on your preferences</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Input
            type="text"
            placeholder="Search contests..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={(value) => setTypeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="CF">CF</SelectItem>
              <SelectItem value="ICPC">ICPC</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setPhaseFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Phases</SelectItem>
              <SelectItem value="BEFORE">BEFORE</SelectItem>
              <SelectItem value="CODING">CODING</SelectItem>
              <SelectItem value="PENDING_SYSTEM_TEST">PENDING_SYSTEM_TEST</SelectItem>
              <SelectItem value="SYSTEM_TEST">SYSTEM_TEST</SelectItem>
              <SelectItem value="FINISHED">FINISHED</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Contests</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ContestList
            contests={paginatedContests}
            currentPage={currentPage}
            pageCount={pageCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>
        <TabsContent value="favorites">
          <ContestList
            contests={paginatedContests}
            currentPage={currentPage}
            pageCount={pageCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-4 md:grid-cols-2">
        <BarChart
          data={contestTypeData}
          title="Contest Types"
          description="Distribution of contest types"
        />
        <PieChart
          data={contestPhaseData}
          title="Contest Phases"
          description="Current status of all contests"
        />
        <AreaChart
          data={contestDurations}
          title="Contest Durations"
          description="Duration of recent contests (in hours)"
        />
        <LineChart
          data={contestParticipants}
          title="Top Contests by Participants"
          description="Contests with the highest number of participants"
        />
      </div>
    </div>
  )
}
