import type { StatCardData } from '../types/dashboard'

const stats: StatCardData[] = [
  {
    id: 1,
    title: 'Active projects',
    value: 8,
    change: '+2',
    description: 'compared to last month',
  },
  {
    id: 2,
    title: 'Open tasks',
    value: 24,
    change: '+5',
    description: 'since last week',
  },
  {
    id: 3,
    title: 'Completed tasks',
    value: 156,
    change: '+18',
    description: 'this month',
  },
  {
    id: 4,
    title: 'Team members',
    value: 6,
    change: '+1',
    description: 'new member this month',
  }
]

export default function Dashboard() {
  return (
    <main className='dashboard'>
      
      <section className='dashboard__stats'>

      </section>
      <section>
        <div></div>
        <div></div>
      </section>
    </main>
  )
}