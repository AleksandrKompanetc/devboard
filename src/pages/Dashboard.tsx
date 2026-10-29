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

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

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

  function handleDeleteProject(projectId: string) {
    setProjects((currentProjects) => 
      currentProjects.filter((project) => project.id !== projectId)
    )
  }

  function openDeleteConfirmation(project: Project) {
    setProjectToDelete(project)
  }

  function confirmDeleteProject() {
    if (!projectToDelete) {
      return
    }

    handleDeleteProject(projectToDelete.id)
    setProjectToDelete(null)
  }

  function cancelDeleteProject() {
    setProjectToDelete(null)
  }

  const filteredProjects = projects.filter((project) => 
    project.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  )

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

        <div className='projects-toolbar'>
          <div className='projects-search'>
            <span className='projects-search__icon'>⌕</span>

            <input
              type='text'
              className='projects-search__input'
              placeholder='Search projects...'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label='Search projects by name'
            />

            {searchQuery && (
              <button
                type='button'
                className='projects-search__clear'
                onClick={() => setSearchQuery('')}
                aria-label='Clear search'
              >
                ×
              </button>
            )}
          </div>
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
            {filteredProjects.map((project) => (
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

                  <button
                    type='button'
                    className='project-card__delete-button'
                    onClick={() => openDeleteConfirmation(project)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <ProjectModal
          key={projectToEdit?.id ?? 'new-project'}
          onClose={() => {
            setIsModalOpen(false)
            setProjectToEdit(null)
          }}
          onCreate={handleCreateProject}
          project={projectToEdit ?? undefined}
          onUpdate={handleUpdateProject}
        />
      )}

      {projectToDelete && (
        <div
          className='delete-modal-overlay'
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              cancelDeleteProject()
            }
          }}
        >
          <section
            className='delete-modal'
            role='alertdialog'
            aria-modal='true'
            aria-labelledby='delete-modal-title'
            aria-describedby='delete-modal-description'
          >
            {/* <div className='delete-modal-icon'>
              !
            </div> */}

            <h2 id='delete-modal-title'>
              Delete Project?
            </h2>

            <p id='delete-modal-description'>
              Are you sure you want to delete{' '}
              <strong>{projectToDelete.name}</strong>?
              This action cannot be undone.
            </p>

            <div className='delete-modal__actions'>
              <button
                type='button'
                className='delete-modal__cancel'
                onClick={cancelDeleteProject}
              >
                Cancel
              </button>
              <button
                type='button'
                className='delete-modal__confirm'
                onClick={confirmDeleteProject}
              >
                Delete project
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}