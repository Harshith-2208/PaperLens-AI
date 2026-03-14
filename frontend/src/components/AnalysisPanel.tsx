"use client"

import { forwardRef, useEffect, useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/navigation"
import { Analysis } from "../types"

interface Props {
  analysis: Analysis | null
  isAnalyzing: boolean
  analysisKey: number
  onStart?: () => void
}

const AnalysisPanel = forwardRef<HTMLDivElement, Props>(({ analysis, isAnalyzing, analysisKey, onStart }, ref) => {
  const [displayText, setDisplayText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (analysis?.analysis) {
      setDisplayText("")
      onStart?.()
      let index = 0
      const text = analysis.analysis
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
          setTimeout(() => {
            containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
          }, 10)
        } else {
          clearInterval(interval)
        }
      }, 15)
      return () => clearInterval(interval)
    } else {
      setDisplayText("")
    }
  }, [analysisKey])

  useEffect(() => {
    if (!isAnalyzing && displayText) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
      }, 50)
    }
  }, [displayText, isAnalyzing])

  if (!analysis && !isAnalyzing) return null

  const handleQuiz = () => {
    if (!analysis?.analysis) return

    const quizSection = analysis.analysis.split("## Quiz")[1]

    if (!quizSection) return

    localStorage.setItem("quiz", quizSection)

    router.push("/quiz")
  }

  const hasQuiz = analysis?.analysis?.includes("## Quiz")
  const analysisContent = displayText.split("## Quiz")[0]
  
  return (
    <div ref={ref} className="mt-16 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Paper Analysis</h2>
          <p className="text-zinc-500 text-sm">AI-powered insights from the paper</p>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <svg className="animate-spin h-6 w-6 text-indigo-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <div className="absolute inset-0 bg-indigo-400/20 blur-lg animate-pulse rounded-full" />
            </div>
            <span className="text-zinc-300 font-medium">Generating analysis...</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
            <div className="flex justify-between text-xs text-zinc-600">
              <span>Reading paper content</span>
              <span>Processing...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-white mt-8 mb-4 pb-3 border-b border-zinc-800">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-indigo-400 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 mb-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-none space-y-2 mb-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-zinc-300 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-zinc-400">
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-zinc-800/80 text-emerald-400 px-2 py-1 rounded text-sm font-mono border border-zinc-700/50">
                      {children}
                    </code>
                  ),
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 hover:decoration-indigo-300 transition-all">
                      {children}
                    </a>
                  ),
                }}
              >
                {analysisContent}
              </ReactMarkdown>
            </div>
            {analysis?.analysis?.includes("## Quiz") && !isAnalyzing && (
              <div className="flex justify-center mt-8 pt-6 border-t border-zinc-800">
                <button
                  onClick={handleQuiz}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Take a Quiz
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
})

AnalysisPanel.displayName = "AnalysisPanel"

export default AnalysisPanel
