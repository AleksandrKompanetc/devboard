import { StatCardData } from '../types/dashboard'

interface StatCardProps {
  stat: StatCardData
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <article className='stat-card'>
      <div className='stat__card-top'>
        <span className='stat__card-title'>{stat.title}</span>
        <span className='stat__card-icon'>↗</span>
      </div>

      <div className='stat--card-value'>
        {stat.value}
      </div>

      <div className='stat__card-bottom'>
        <span className='stat__card-change'>
          {stat.change}
        </span>

        <span className='stat__card-description'>
          {stat.description}
        </span>
      </div>
    </article>
  )
}