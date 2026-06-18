export type Tier = 'free' | 'paid' | 'freemium'

export interface Issue {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  issue_number: number
  tier: Tier
  category: string
  published_at: string
  created_at: string
}

export interface Short {
  id: string
  title: string
  body: string
  tag: string
  published_at: string
  created_at: string
}

export interface SubscriberCount {
  count: number
}

export interface AffiliateLink {
  url: string
  label: string
}

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  tier: Tier
  url: string
  icon?: string
  imageUrl?: string
  featured?: boolean
  popular?: boolean
  premium?: boolean
  affiliateLink?: AffiliateLink
}

export interface Stack {
  id: string
  name: string
  slug: string
  description: string
  tools: Tool[]
  category: string
  featured?: boolean
}

export interface Builder {
  id: string
  slug: string
  name: string
  title: string
  operatorNumber: string
  bio: string
  location?: string
  website?: string
  avatar?: string
  specialty: string[]
  stacks: Stack[]
  links: {
    twitter?: string
    github?: string
    website?: string
    linkedin?: string
  }
  featured?: boolean
}

export interface BuilderProfile extends Builder {}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  published_at: string
  created_at: string
  author?: string
  imageUrl?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
}

export interface Subscriber {
  id: string
  email: string
  tier: Tier
  subscribed_at: string
}
