import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import ProfileBuilder from "@/pages/ProfileBuilder"
import JobHub from "@/pages/JobHub"
import InterviewPrep from "@/pages/InterviewPrep"
import Login from "@/pages/Login"
import Settings from "@/pages/Settings"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout onSignOut={() => setIsAuthenticated(false)} />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileBuilder />} />
          <Route path="jobs" element={<JobHub />} />
          <Route path="interview" element={<InterviewPrep />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
