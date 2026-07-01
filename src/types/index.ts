export interface Project {
  num:      string
  tag:      string | null
  title:    string
  company:  string
  desc:     string
  stack:    string[]
  link:     string | null
  featured: boolean
  image?:   string
  gallery?: string[]
}

export interface SkillGroup {
  icon:  string
  title: string
  tags:  string[]
}

export interface NavLink {
  label: string
  href:  string
}

export interface SocialLink {
  label: string
  href:  string
  mono:  string
}

export interface Stat {
  number: string
  label:  string
}