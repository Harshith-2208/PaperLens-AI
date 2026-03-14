"use client"

import { useState, useRef, useEffect } from "react"
import useSearch from "../hooks/useSearch"

import SearchBar from "../components/SearchBar"
import PaperList from "../components/PaperList"
import UploadPDF from "../components/UploadPDF"
import AnalysisPanel from "../components/AnalysisPanel"

import API from "../services/api"
import { Analysis, Paper } from "../types"

type Tab = "search" | "upload"

export default function Home() {
  const { papers, search, isLoading } = useSearch()

  const [activeTab, setActiveTab] = useState<Tab>("search")
  const [filename, setFilename] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [analyzingPaperId, setAnalyzingPaperId] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisKey, setAnalysisKey] = useState(0)
  const [isTrending, setIsTrending] = useState(true)

  const analysisRef = useRef<HTMLDivElement>(null)

  const scrollToAnalysis = () => {
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  useEffect(() => {
    search("")
  }, [])

  const analyzeFromSearch = async (paper: Paper, id: string) => {
    setAnalysis(null)
    setIsAnalyzing(true)
    setAnalyzingPaperId(id)
    scrollToAnalysis()

    try {
      const res = await API.post("/analyze-url", null, {
        params: { pdf_url: paper.pdf }
      })

      setAnalysis(res.data)
      setAnalysisKey(Date.now())

    } catch (error) {
      console.error("Analysis failed:", error)
    }
  }

  const analyzeUpload = async () => {
    if (!filename) return

    setAnalysis(null)
    setIsAnalyzing(true)
    setAnalyzingPaperId("upload")

    scrollToAnalysis()

    try {
      const res = await API.post("/analyze", null, {
        params: { filename }
      })

      setAnalysis(res.data)
      setAnalysisKey(Date.now())

    } catch (error) {
      console.error("Upload analysis failed:", error)
    }
  }

  const handleSearch = (query: string) => {
    if (!query || query.trim() === "") {
      setIsTrending(true)
      search("")
    } else {
      setIsTrending(false)
      search(query)
    }
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(false)
    setAnalyzingPaperId(null)
  }

  const changeTab = (tab: Tab) => {
    setActiveTab(tab)
    setAnalysis(null)
    setIsAnalyzing(false)
    setAnalyzingPaperId(null)
    setAnalysisKey(Date.now())
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-30" />
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              PaperLens AI
            </h1>
          </div>
          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto">
            Instantly analyze research papers with AI-powered insights
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <div className="bg-zinc-900/60 backdrop-blur-md p-1.5 rounded-2xl flex gap-1.5 border border-zinc-800/50 shadow-xl">
            <button
              onClick={() => changeTab("search")}
              className={`tab-button px-6 py-3.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === "search"
                  ? "active text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search for a paper
              </span>
            </button>

            <button
              onClick={() => changeTab("upload")}
              className={`tab-button px-6 py-3.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === "upload"
                  ? "active text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload a paper
              </span>
            </button>
          </div>
        </div>

        {activeTab === "search" ? (
          <div className="animate-fade-in">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {papers.length > 0 && (
              <>
                <div className="flex items-center gap-3 mt-10 mb-6">
                  <div className="w-1 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  <p className="text-xl font-semibold">
                    {isTrending ? (
                      <span className="text-white">Trending Research Papers</span>
                    ) : (
                      <>
                        <span className="text-zinc-400">Found </span>
                        <span className="text-white">{papers.length}</span>
                        <span className="text-zinc-400"> papers</span>
                      </>
                    )}
                  </p>
                </div>

                <PaperList
                  papers={papers}
                  onAnalyze={analyzeFromSearch}
                  analyzingPaperId={analyzingPaperId}
                />
              </>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <UploadPDF
              filename={filename}
              setFilename={setFilename}
              onAnalyze={analyzeUpload}
              isAnalyzing={analyzingPaperId === "upload"}
            />
          </div>
        )}

        <AnalysisPanel
          key={analysisKey}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          analysisKey={analysisKey}
          onStart={handleAnalysisStart}
          ref={analysisRef}
        />

        <footer className="mt-20 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-600 text-sm">
            Powered by advanced AI for instant paper insights
          </p>
        </footer>
      </div>
    </div>
  )
}
