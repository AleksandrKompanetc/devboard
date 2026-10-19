import { useState } from 'react'
import Header from '../components/Header'
import type { StatCardData } from '../types/dashboard'
import type { Project } from '../types/project'
import StatCard from '../components/StatCard'
import ProjectModal from '../components/ProjectModal'

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
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleCreateProject(project: Project) {
    setProjects((prevProjects) => [...prevProjects, project])
    setIsModalOpen(false)
  }

  return (
    <main className='dashboard'>
      <Header onNewProject={() => setIsModalOpen(true)} />

      <section className='dashboard__stats'>
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className='dashboard__section'>
        <div className='dashboard__section-heading'>
          <div>
            <h2>Recent projects</h2>
            <p>Keep track of your latest work</p>
          </div>

          <button
            className='dashboard__view-button'
            onClick={() => setIsModalOpen(true)}
          >
            + New project
          </button>
        </div>

        {projects.length === 0 && (
          <div className='dashboard__empty-state'>
            <div className='dashboard__empty-icon'>▦</div>
            <h3>Your projects will appear here</h3>
            <p>Create your first projects to start organizing your work</p>
            <button
              onClick={() => setIsModalOpen(true)}
            >
              + Create your first project
            </button>
          </div>
        ) : (

        )}
      </section>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
    </main>
  )
}