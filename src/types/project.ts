import type { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES } from "react"

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

export type ProjectSort = 
| 'newest'
| 'oldest'
| 'name-asc'
| 'name-desc'
| 'due-date'