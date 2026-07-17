import { useState, useEffect } from "react"
import { CheckCircle2, Loader2, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mcpClient } from "@/services/stitchMcpClient"

export function ApplicationEngineModal({ 
  jobTitle, 
  company, 
  onClose 
}: { 
  jobTitle: string; 
  company: string; 
  onClose: () => void 
}) {
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<any>(null)

  const steps = [
    "Research Agent analyzing JD...",
    "Writing Agent tailoring resume...",
    "ATS Optimization Agent checking keywords...",
    "Finalizing Quality Check..."
  ]

  useEffect(() => {
    let currentStep = 0;
    
    const runAgents = async () => {
      // Simulate multi-agent steps
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setStep(currentStep);
        } else {
          clearInterval(interval);
        }
      }, 1000);

      // Call MCP backend
      const data = await mcpClient.tailorApplication(jobTitle, company);
      setResult(data);
      clearInterval(interval);
      setStep(steps.length); // Completed
    };

    runAgents();
  }, [jobTitle, company]);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-5xl rounded-xl shadow-2xl border flex flex-col overflow-hidden max-h-[90vh]">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/30">
          <h2 className="text-xl font-bold tracking-tight">AI Application Engine</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="p-6 flex-1 overflow-auto flex flex-col md:flex-row gap-6">
          {/* Left Panel: Progress & Controls */}
          <div className="w-full md:w-1/3 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Multi-Agent Workflow</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {steps.map((label, idx) => {
                  const isActive = step === idx;
                  const isCompleted = step > idx;
                  
                  return (
                    <div key={idx} className="relative flex items-center gap-4">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center z-10 ${
                        isCompleted ? 'bg-indigo-600 text-white' : 
                        isActive ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600 ring-offset-2 ring-offset-background' : 
                        'bg-slate-200 text-slate-400 dark:bg-slate-800'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {label}
                        {isActive && <Loader2 className="inline h-3 w-3 ml-2 animate-spin" />}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {step >= steps.length && (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Ready for Review</span>
                </div>
                <p className="text-sm text-green-600/80 dark:text-green-400/80 mb-4">
                  The agents have tailored your application for {company}. Please review the quality check before submitting.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={onClose}>
                  Approve & Auto-Fill
                </Button>
              </div>
            )}
          </div>

          {/* Right Panel: Split Screen Quality Check */}
          <div className="w-full md:w-2/3 bg-muted/30 rounded-xl border p-4 flex flex-col relative overflow-hidden">
            {step < steps.length ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
                <p>Generating optimized application...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-700">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  Quality Check View
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  {/* Tailored Output */}
                  <Card className="flex flex-col h-full border-indigo-100 dark:border-indigo-900 shadow-sm">
                    <CardContent className="p-4 flex-1 overflow-auto">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Tailored Summary</span>
                        <p className="mt-2 text-sm leading-relaxed">{result?.tailoredResumeSummary}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Cover Letter Snippet</span>
                        <div className="mt-2 text-sm leading-relaxed p-3 bg-slate-50 dark:bg-slate-900 rounded border font-mono whitespace-pre-wrap">
                          {result?.coverLetterSnippet}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* AI Feedback */}
                  <div className="space-y-4">
                    <Card className="bg-indigo-600 text-white shadow-md border-0">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100 text-sm font-medium">Confidence Score</p>
                          <h4 className="text-3xl font-bold">{result?.confidenceScore}%</h4>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Agent Suggestions</span>
                        <ul className="space-y-3">
                          {result?.suggestions.map((s: string, i: number) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
