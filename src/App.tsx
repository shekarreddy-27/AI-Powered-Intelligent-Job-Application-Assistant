import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import ProfileBuilder from "@/pages/ProfileBuilder"
import JobHub from "@/pages/JobHub"
import InterviewPrep from "@/pages/InterviewPrep"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileBuilder />} />
          <Route path="jobs" element={<JobHub />} />
          <Route path="interview" element={<InterviewPrep />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
