import { useAppStore } from "@/store/useAppStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, CheckCircle, FileText, Target, Clock, ArrowRight } from "lucide-react"

export default function Dashboard() {
  const { profile, applications } = useAppStore()

  const totalApps = applications.length
  const interviews = applications.filter(a => a.status === 'Interview').length
  const offers = applications.filter(a => a.status === 'Offer').length
  const rejections = applications.filter(a => a.status === 'Rejected').length
  const successRate = totalApps > 0 ? Math.round(((interviews + offers) / totalApps) * 100) : 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.firstName}</h1>
        <p className="text-muted-foreground mt-1">Here is what's happening with your job applications today.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApps}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Interviews Secured</CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews}</div>
            <p className="text-xs text-muted-foreground mt-1">Next interview in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Interview/Offer conversion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejections</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejections}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep pushing!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Application Tracker */}
        <Card className="lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Active Applications</CardTitle>
            <CardDescription>Recent applications and their current status.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div>
                    <h4 className="font-medium">{app.company}</h4>
                    <p className="text-sm text-muted-foreground">{app.role}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden md:inline-block">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                    <Badge variant={
                      app.status === 'Interview' ? 'success' :
                      app.status === 'Applied' ? 'warning' :
                      app.status === 'Rejected' ? 'destructive' : 'default'
                    }>
                      {app.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Actions */}
        <Card className="lg:col-span-3 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900">
          <CardHeader>
            <CardTitle className="text-indigo-900 dark:text-indigo-200">Upcoming Actions</CardTitle>
            <CardDescription className="text-indigo-700 dark:text-indigo-400">Tasks needing your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
                </div>
                <div>
                  <h5 className="font-medium text-sm text-indigo-950 dark:text-indigo-100">Send follow-up email to Google</h5>
                  <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">Due today at 5:00 PM</p>
                </div>
                <button className="ml-auto text-indigo-600 hover:text-indigo-700"><ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
                </div>
                <div>
                  <h5 className="font-medium text-sm text-indigo-950 dark:text-indigo-100">Prep for Stripe system design</h5>
                  <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">Interview tomorrow</p>
                </div>
                <button className="ml-auto text-indigo-600 hover:text-indigo-700"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
