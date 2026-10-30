export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed'

export type ProjectFilter = 'All' | ProjectStatus

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  dueDate: string
  createdAt: string
}