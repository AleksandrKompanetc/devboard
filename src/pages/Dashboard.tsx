import { useEffect, useState } from 'react'
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
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('dashboard-projects')

    if (!savedProjects) {
      return []
    }

    try {
      return JSON.parse(savedProjects) as Project[]
    } catch {
      return []
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null)

  useEffect(() => {
    localStorage.setItem('dashboard-projects', JSON.stringify(projects))
  }, [projects])

  function handleCreateProject(project: Project) {
    setProjects((prevProjects) => [...prevProjects, project])
    setIsModalOpen(false)
  }

  function openCreateModal() {
    setProjectToEdit(null)
    setIsModalOpen(true)
  }

  function openEditModal(project: Project) {
    setProjectToEdit(project)
    setIsModalOpen(true)
  }

  function handleUpdateProject(updatedProject: Project) {
    setProjects((currentProjects) => 
      currentProjects.map((project) =>
         project.id === updatedProject.id
          ? updatedProject
          : project
      )  
    )

    setProjectToEdit(null)
    setIsModalOpen(false)
  }

  return (
    <main className='dashboard'>
      <Header onNewProject={openCreateModal} />

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
            onClick={openCreateModal}
          >
            + New project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className='dashboard__empty-state'>
            <div className='dashboard__empty-icon'>▦</div>
            <h3>Your projects will appear here</h3>
            <p>Create your first projects to start organizing your work</p>
            <button
              onClick={openCreateModal}
            >
              + Create your first project
            </button>
          </div>
        ) : (
          <div className='projects'>
            {projects.map((project) => (
              <article
                className='project-card'
                key={project.id}
              >
                <div className='project-card__top'>
                  <span className='project-card__icon'>▦</span>
                  <span className='project-card__status'>
                    {project.status}
                  </span>
                </div>

                <h3 className='project-card__name'>
                  {project.name}
                </h3>

                <p className='project-card__description'>
                  {project.description || 'No description provided.'}
                </p>

                <div className='project-card__footer'>
                  <span>
                    Created{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>

                  {project.dueDate && (
                    <span>Due{project.dueDate}</span>
                  )}

                  <button
                    type='button'
                    className='project-card__edit-button'
                    onClick={() => openEditModal(project)}
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
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