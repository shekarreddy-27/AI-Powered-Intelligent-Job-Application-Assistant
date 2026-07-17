import { useState } from "react"
import { PlayCircle, MessageSquare, Mail, Copy, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InterviewPrep() {
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])

  const emailTemplate = `Dear [Interviewer Name],

Thank you for taking the time to speak with me today about the [Job Title] position at [Company]. It was great learning more about the team's goals and the upcoming projects.

I'm particularly excited about [Specific Topic Discussed], and I'm confident my background in [Your Skill/Experience] would allow me to make an immediate impact.

Please let me know if you need any additional information from me. I look forward to hearing about the next steps.

Best regards,
[Your Name]
[Your LinkedIn/Portfolio URL]`

  const handleCopy = () => {
    navigator.clipboard.writeText(emailTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateQuestions = () => {
    setGenerating(true)
    // Simulate AI generation delay
    setTimeout(() => {
      setQuestions([
        "Can you describe a time when you had to optimize a React application's performance?",
        "How do you handle state management in large scale frontend applications? (e.g., Zustand vs Redux)",
        "Tell me about a challenging bug you recently fixed. What was your debugging process?",
        "How do you ensure your UI components are accessible and responsive?"
      ])
      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview & Follow-up Prep</h1>
        <p className="text-muted-foreground mt-1">Generate tailored interview questions and post-interview communications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Interview Prep Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              Mock Interview Questions
            </CardTitle>
            <CardDescription>Based on your latest tailored resume and job descriptions.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {questions.length > 0 ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-muted/50 rounded-lg border text-sm">
                    <span className="font-semibold text-indigo-600 mr-2">Q{idx + 1}:</span>
                    {q}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={() => setQuestions([])}>
                  Clear
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <PlayCircle className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <p className="mb-4 max-w-[250px] text-sm">Select an active application to generate specific questions.</p>
                <Button 
                  onClick={handleGenerateQuestions} 
                  disabled={generating}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {generating ? "Analyzing profile..." : "Generate Custom Questions"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Generator Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-500" />
              Post-Interview Follow-up
            </CardTitle>
            <CardDescription>Ready-to-use templates tailored to your recent interviews.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-slate-50 dark:bg-slate-900 border rounded-lg p-4 font-mono text-sm whitespace-pre-wrap text-muted-foreground">
              {emailTemplate}
              
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-2 right-2 h-8"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy text"}
              </Button>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1">Thank You Note</Button>
              <Button variant="outline" className="flex-1">Status Follow-up</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
