export interface Education {
  degree: string
  school: string
  major: string
  period: string
  description?: string
}

export interface Publication {
  title: string
  journal: string
  year: number
  authors: string
  doi?: string
  abstract?: string
  reportFile?: string
}

export interface Project {
  name: string
  role: string
  description: string
  technologies: string[]
}

export interface Skill {
  name: string
  level: number
  icon?: string
}

export interface SkillCategory {
  category: string
  items: Skill[]
}

export interface Contact {
  email: string
  phone?: string
  address?: string
}

export interface Social {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  title: string
  subtitle: string
  researchFields: string[]
  avatarUrl?: string
  about: string
  education: Education[]
  publications: Publication[]
  projects: Project[]
  skills: SkillCategory[]
  contact: Contact
  social: Social[]
}
