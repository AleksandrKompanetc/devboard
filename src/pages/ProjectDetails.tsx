import { useParams, Link } from 'react-router-dom'
import type { Project } from '../types/project'

export default function ProjectDetails() {
  const { id } = useParams()
  const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]')
  const project: Project | undefined = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className='project-details'>

        <Link to='/' className='project-details-back'>
          ← Back to Dashboard
        </Link>

        <h1>Project not found</h1>
        <p>The project you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className='project-details'>
      <Link to='/' className='project-details-back'>
        ← Back to Dashboard
      </Link>

      <div className='project-details-header'>
        <div>
          <p>PROJECT DETAILS</p>
          <h1>{project.name}</h1>
          <p>{project.description || 'No description provided.'}</p>
        </div>
        <span
          className={`project-status project-status--${project.status
            .toLowerCase()
            .replace(' ', '-')
            }`}
        >
          {project.status}
        </span>
      </div>

      <div className='project-details-grid'>
        <div className='project-details-card'>
          <span className='project-details-label'>
            Created At
          </span>
          <strong>
            {new Date(project.createdAt).toLocaleDateString()}
          </strong>
        </div>

        <div className='project-details-card'>
          <span className='project-details-label'>
            Due date
          </span>

          <strong>
            {project.dueDate
              ? new Date(`${project.dueDate}T00:00:00`).toLocaleDateString()
              : 'No due date'}
          </strong>
        </div>

        <div className='project-details-card'>
          <span className='project-details-label'>
            Project ID
          </span>
          <strong>{project.id}</strong>
        </div>
      </div>
    </div>
  )
}