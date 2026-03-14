"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()

  const [quiz, setQuiz] = useState<any[]>([])
  const [answers, setAnswers] = useState<any>({})
  const [score, setScore] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const quizText = localStorage.getItem("quiz")
    if (!quizText) return
    setQuiz(parseQuiz(quizText))
  }, [])

  const parseQuiz = (text: string) => {
    const questions = text.trim().split("\n\n")
    return questions.map(q => {
      const lines = q.split("\n")
      return {
        question: lines[0],
        options: lines.slice(1, 5),
        answer: lines[5]?.replace("Answer: ", "")
      }
    })
  }

  const handleSubmit = () => {
    let correct = 0
    quiz.forEach((q, i) => {
      if (answers[i]?.startsWith(q.answer)) correct++
    })
    setScore(correct)
    setShowResult(true)
  }

  const handleGoHome = () => {
    localStorage.removeItem("quiz")
    router.push("/")
  }

  if (score !== null) {
    const percentage = (score / quiz.length) * 100
    const isPassing = percentage >= 70

    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${isPassing ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30' : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30'}`}>
              {isPassing ? (
                <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-zinc-400">Here's how you performed</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${percentage * 2.83} 283`} strokeLinecap="round" className={isPassing ? "text-emerald-500" : "text-amber-500"} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{Math.round(percentage)}%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-zinc-300 text-lg">
              You scored <span className="text-white font-semibold">{score}</span> out of <span className="text-white font-semibold">{quiz.length}</span>
            </p>
          </div>

          <button
            onClick={handleGoHome}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Paper Quiz</h1>
            <p className="text-zinc-500 text-sm">Test your understanding</p>
          </div>
        </div>

        <div className="space-y-6">
          {quiz.map((q, i) => (
            <div key={i} className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shrink-0 text-white font-semibold text-sm">
                  {i + 1}
                </div>
                <p className="text-white font-semibold pt-1">{q.question}</p>
              </div>

              <div className="space-y-2 ml-12">
                {q.options.map((opt: string, j: number) => (
                  <label
                    key={j}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                      answers[i] === opt
                        ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                        : "bg-zinc-800/30 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800/50 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      onChange={() => setAnswers({ ...answers, [i]: opt })}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[i] === opt
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-zinc-600"
                    }`}>
                      {answers[i] === opt && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== quiz.length}
          className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 disabled:from-zinc-700 disabled:to-zinc-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Submit Quiz
        </button>
      </div>
    </div>
  )
}
