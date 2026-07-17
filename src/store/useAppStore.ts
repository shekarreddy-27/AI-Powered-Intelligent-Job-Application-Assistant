import { create } from 'zustand'

export type ApplicationStatus = 'Applied' | 'Interview' | 'Rejected' | 'Offer'

export interface JobApplication {
  id: string
  company: string
  role: string
  status: ApplicationStatus
  appliedDate: string
  matchScore: number
  logoUrl?: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  targetRoles: string[]
  targetSalary: string
  workPreference: string // 'Remote' | 'On-site' | 'Hybrid'
}

interface AppState {
  profile: UserProfile
  applications: JobApplication[]
  setProfile: (profile: Partial<UserProfile>) => void
  addApplication: (app: JobApplication) => void
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void
}

export const useAppStore = create<AppState>((set) => ({
  profile: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '',
    targetRoles: ['Frontend Engineer', 'Full Stack Developer'],
    targetSalary: '$120,000',
    workPreference: 'Remote',
  },
  applications: [
    {
      id: '1',
      company: 'Google',
      role: 'Senior Frontend Engineer',
      status: 'Interview',
      appliedDate: '2026-07-10',
      matchScore: 92,
    },
    {
      id: '2',
      company: 'Stripe',
      role: 'Full Stack Engineer',
      status: 'Applied',
      appliedDate: '2026-07-15',
      matchScore: 88,
    },
    {
      id: '3',
      company: 'Linear',
      role: 'Frontend Developer',
      status: 'Rejected',
      appliedDate: '2026-06-20',
      matchScore: 75,
    },
  ],
  setProfile: (newProfile) =>
    set((state) => ({ profile: { ...state.profile, ...newProfile } })),
  addApplication: (app) =>
    set((state) => ({ applications: [app, ...state.applications] })),
  updateApplicationStatus: (id, status) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status } : app
      ),
    })),
}))
