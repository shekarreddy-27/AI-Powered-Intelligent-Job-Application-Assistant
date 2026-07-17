import { useState } from "react"
import { Search, MapPin, Building, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApplicationEngineModal } from "@/components/ApplicationEngineModal"
import { useAppStore } from "@/store/useAppStore"
import { mcpClient } from "@/services/stitchMcpClient"

const MOCK_JOBS = [
  {
    id: 'j1',
    company: 'Vercel',
    role: 'Senior React Developer',
    location: 'Remote',
    salary: '$140k - $180k',
    description: 'Looking for an experienced React developer to build next-generation web tools.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'j2',
    company: 'OpenAI',
    role: 'Frontend Engineer - AI Tools',
    location: 'San Francisco, CA / Hybrid',
    salary: '$160k - $210k',
    description: 'Help build interfaces for the most powerful AI models in the world.',
    skills: ['React', 'TypeScript', 'WebSockets', 'GraphQL']
  }
]

export default function JobHub() {
  const { profile } = useAppStore()
  const [activeJob, setActiveJob] = useState<any>(null)
  const [analyzedJobs, setAnalyzedJobs] = useState<Record<string, any>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJobForApp, setSelectedJobForApp] = useState<{title: string, company: string} | null>(null)

  const handleAnalyzeFit = async (job: typeof MOCK_JOBS[0]) => {
    setActiveJob(job.id)
    const result = await mcpClient.analyzeJobFit(job.description, profile)
    setAnalyzedJobs(prev => ({ ...prev, [job.id]: result }))
    setActiveJob(null)
  }

  const handleApply = (title: string, company: string) => {
    setSelectedJobForApp({ title, company })
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Discovery Hub</h1>
        <p className="text-muted-foreground mt-1">Find roles matched to your profile and let AI handle the heavy lifting.</p>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by role, company, or keyword..."
          className="w-full h-11 bg-card border shadow-sm rounded-lg pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_JOBS.map(job => (
          <Card key={job.id} className="flex flex-col hover:border-indigo-200 hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.role}</CardTitle>
                  <div className="flex items-center gap-1 text-muted-foreground mt-1.5 text-sm">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm">{job.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
                ))}
              </div>

              {/* AI Analysis Section */}
              {analyzedJobs[job.id] ? (
                <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-md border border-indigo-100 dark:border-indigo-900 animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">AI Fit Score</span>
                    <Badge variant={analyzedJobs[job.id].fitScore > 80 ? 'success' : 'warning'}>
                      {analyzedJobs[job.id].fitScore}% Match
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-indigo-800 dark:text-indigo-300">
                    <p><span className="font-medium">Matches:</span> {analyzedJobs[job.id].matchingSkills.join(', ')}</p>
                    {analyzedJobs[job.id].missingSkills.length > 0 && (
                      <p><span className="font-medium text-amber-600 dark:text-amber-500">Gaps:</span> {analyzedJobs[job.id].missingSkills.join(', ')}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => handleAnalyzeFit(job)}
                    disabled={activeJob === job.id}
                  >
                    {activeJob === job.id ? 'Analyzing...' : <><Sparkles className="h-4 w-4 mr-2" /> Analyze Profile Fit</>}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/20">
              <div className="w-full flex items-center justify-between">
                <span className="text-sm font-medium">{job.salary}</span>
                <Button 
                  onClick={() => handleApply(job.role, job.company)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Apply with AI
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isModalOpen && selectedJobForApp && (
        <ApplicationEngineModal
          jobTitle={selectedJobForApp.title}
          company={selectedJobForApp.company}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
