"use client"

import { useState } from "react"
import useSearch from "../hooks/useSearch"

import SearchBar from "../components/SearchBar"
import PaperList from "../components/PaperList"
import UploadPDF from "../components/UploadPDF"
import AnalysisPanel from "../components/AnalysisPanel"

import API from "../services/api"

export default function Home() {

const { papers, search } = useSearch()

const [filename, setFilename] = useState<string | null>(null)
const [analysis, setAnalysis] = useState<any>(null)

const analyze = async () => {

if (!filename) return

const res = await API.post("/analyze", null, {
params: { filename }
})

setAnalysis(res.data)

}

return (

<div>

<h1>PaperLens AI</h1>

<SearchBar onSearch={search} />

<PaperList papers={papers} setAnalysis={setAnalysis} />

<UploadPDF setFilename={setFilename} />

<button onClick={analyze}>
Analyze Uploaded Paper
</button>

<AnalysisPanel analysis={analysis} />

</div>

)

}