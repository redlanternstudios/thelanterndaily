export type Tier = 'free' | 'paid'

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
