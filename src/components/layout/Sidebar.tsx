import { NavLink } from "react-router-dom"
import { Home, User, Briefcase, MessageSquare, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Dashboard", to: "/" },
  { icon: User, label: "Master Profile", to: "/profile" },
  { icon: Briefcase, label: "Job Hub", to: "/jobs" },
  { icon: MessageSquare, label: "Interview Prep", to: "/interview" },
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-2 text-indigo-600">
          <Briefcase className="h-6 w-6" />
          <span className="font-bold text-lg text-foreground tracking-tight">CareerAgent<span className="text-indigo-600">AI</span></span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Settings className="h-5 w-5" />
          Settings
        </button>
      </div>
    </aside>
  )
}
