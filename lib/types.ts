export interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

export interface Project {
  id: string
  title: string
  description: string
  slides: Slide[]
  designStyle: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  numberOfSlides: number
}

export interface UserDetail {
  uid: string
  email: string
  fullName: string
  credits: number
  isSubscribed: boolean
  createdAt: Date
}
