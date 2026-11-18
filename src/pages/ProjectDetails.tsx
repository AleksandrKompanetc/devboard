import { useParams } from 'react-router-dom'
import type { Project } from '../types/project'

export default function ProjectDetails() {
  const { id } = useParams()
  const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]')
  const project: Project | undefined = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div>
        <h1>Project not found</h1>
        <p>The project you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project details will be displayed here.</p>
    </div>
  )
}