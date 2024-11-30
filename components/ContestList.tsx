import Link from 'next/link'
import { Contest } from '@/types/contest'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContestListProps {
  contests: Contest[]
  currentPage: number
  pageCount: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function ContestList({
  contests,
  currentPage,
  pageCount,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  favorites,
  onToggleFavorite,
}: ContestListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Favorite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contests.map((contest, index) => (
              <motion.tr
                key={contest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TableCell>
                  <Link href={`/contest/${contest.id}`} className="hover:underline text-primary">
                    {contest.name}
                  </Link>
                </TableCell>
                <TableCell>{contest.type}</TableCell>
                <TableCell>{contest.phase}</TableCell>
                <TableCell>{Math.floor(contest.durationSeconds / 3600)} hours</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(contest.id)}
                    aria-label={favorites.includes(contest.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className={favorites.includes(contest.id) ? "fill-yellow-400" : "text-gray-400"} />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {pageCount}
            </span>
            <Button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

