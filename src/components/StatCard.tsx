import type { StatCardData } from '../types/dashboard'

interface StatCardProps {
  stat: StatCardData
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <article className='stat-card'>
      <div className='stat-card__top'>
        <span className='stat-card__title'>{stat.title}</span>
        <span className='stat-card__icon'>↗</span>
      </div>

      <div className='stat-card__value'>
        {stat.value}
      </div>

      <div className='stat-card__bottom'>
        <span className='stat-card__change'>
          {stat.change}
        </span>

        <span className='stat-card__description'>
          {stat.description}
        </span>
      </div>
    </article>
  )
}