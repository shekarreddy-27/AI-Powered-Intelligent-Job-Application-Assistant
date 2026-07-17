import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfileBuilder() {
  const { profile, setProfile } = useAppStore()
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'preferences', label: 'Preferences' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile({ [name]: value })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Master Profile</h1>
        <p className="text-muted-foreground mt-1">This profile acts as the source of truth for all AI-tailored applications.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {tabs.find(t => t.id === activeTab)?.label}
              </CardTitle>
              <CardDescription>
                Update your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} to improve AI matching and generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">First Name</label>
                    <input
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Last Name</label>
                    <input
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Target Salary</label>
                    <input
                      name="targetSalary"
                      value={profile.targetSalary}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Work Preference</label>
                    <select
                      name="workPreference"
                      value={profile.workPreference}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>
              )}

              {['experience', 'education', 'projects', 'skills'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg border-muted">
                  <p className="text-sm text-muted-foreground mb-4">No entries added yet.</p>
                  <Button variant="outline">Add New Entry</Button>
                </div>
              )}

            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6 mt-6">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
