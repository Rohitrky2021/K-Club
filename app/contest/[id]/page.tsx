'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Contest } from '@/types/contest'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

// In-memory cache
const contestCache = new Map<string, Contest>();

// Dummy data  //
export const dummyContest: Contest = {
  id: 12345,
  name: 'Dummy Contest',
  type: 'ICPC',
  phase: 'FINISHED',
  frozen: false,
  durationSeconds: 7200, // 2 hours
  startTimeSeconds: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
  relativeTimeSeconds: -86400, // 1 day ago (negative for past contests)
  participantCount: 100, // Optional property
};


export default function ContestPage() {
  const { id } = useParams() as { id: string }
  const [contest, setContest] = useState<Contest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContest = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check cache
        if (contestCache.has(id)) {
          console.log('Cache hit');
          setContest(contestCache.get(id) || null);
          return;
        }

        const response = await fetch(`https://codeforces.com/api/contest.list`);
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch contest details');
        }

        const data = await response.json();
        const foundContest = data.result.find((c: Contest) => c.id.toString() === id);
        if (!foundContest) {
          throw new Error('Contest not found');
        }

        // Cache the result
        contestCache.set(id, foundContest);
        setContest(foundContest);
      } catch (error) {
        console.error('Error fetching contest:', error);
        setError((error as Error).message || 'Failed to load contest details. Using dummy data.');
        // Use dummy data if the API fails
        setContest(dummyContest);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContest();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="text-center text-red-500">
        <p>Contest not found</p>
      </div>
    );
  }

  const startTime = new Date(contest.startTimeSeconds * 1000).toLocaleString();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{contest.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-medium text-muted-foreground">ID</dt>
              <dd>{contest.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Type</dt>
              <dd>{contest.type}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Phase</dt>
              <dd>{contest.phase}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Start Time</dt>
              <dd>{startTime}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Duration</dt>
              <dd>{Math.floor(contest.durationSeconds / 3600)} hours</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
