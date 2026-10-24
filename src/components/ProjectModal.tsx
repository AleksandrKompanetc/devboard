import { useState, type FormEvent } from 'react'
import type { ProjectStatus, Project } from '../types/project'

interface ProjectModalProps {
  onClose: () => void
  onCreate: (project: Project) => void
  project?: Project
  onUpdate: (project: Project) => void
}

export default function ProjectModal({ 
  onClose, 
  onCreate,
  project,
  onUpdate, 
}: ProjectModalProps) {
  const [name, setName] = useState(project?.name ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? 'Planning')
  const [dueDate, setDueDate] = useState(project?.dueDate ?? '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (project) {
      const updatedProject: Project = {
        ...project,
        name: name.trim(),
        description: description.trim(),
        status,
        dueDate
      }

      onUpdate(updatedProject)
      return
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      status,
      dueDate,
      createdAt: new Date().toISOString()
    }

    onCreate(newProject)
  }

  return (
    <div className='modal-overlay'>
      <section className='project-modal'>
        <div className='project-modal__header'>
          <div>
            <h2 id='project-modal-title'>
              {project ? 'Edit project' : 'Create project'}
            </h2>
            <p>
              {project 
              ? 'Update the detail of your project'
              : 'Fill in the details for your new project.'}
            </p>
          </div>

          <button
            type='button'
            className='project-modal__close'
            onClick={onClose}
            aria-label='Close modal'
          >
            ×
          </button>

          <form onSubmit={handleSubmit}>
            <div className='project-modal__field'>
              <label htmlFor='project-name'>Project name *</label>
              <input 
                id='project-name'
                type='text'
                placeholder='e.g. Personal portfolio'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={80}
                autoFocus
              />
            </div>

            <div className='project-modal__field'>
              <label htmlFor='project-description'>Description</label>
              <textarea 
                id='project-description'
                placeholder='What are you going to build?'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={500}
              />
            </div>

            <div className='project-modal__field'>
              <label htmlFor='project-status'>Status</label>
              <select
                id='project-status'
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              >
                <option value='Planning'>Planning</option>
                <option value='InProgress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>

            <div className='project-modal__field'>
              <label htmlFor='project-due-date'>Due date</label>
              <input 
                id='project-due-date'
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className='project-modal__actions'>
              <button
                type='button'
                className='project-modal__cancel'
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type='submit'
                className='project-modal__create'
              >
                {project ? 'Save changes' : 'Create project'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}