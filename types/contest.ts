export interface Contest {
  id: number
  name: string
  type: string
  phase: string
  frozen: boolean
  durationSeconds: number
  startTimeSeconds: number
  relativeTimeSeconds: number
  participantCount?: number  // Add this line

}

