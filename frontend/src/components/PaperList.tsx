import PaperCard from "./PaperCard"
import { Paper } from "../types"

interface Props {
  papers: Paper[]
  onAnalyze: (paper: Paper, id: string) => void
  analyzingPaperId: string | null
}

export default function PaperList({ papers, onAnalyze, analyzingPaperId }: Props) {
  return (
    <div className="mt-10">
        <div className="w-1 h-6 bg-gradient-to-r " />
      <div className="grid gap-4">
        {papers.map((paper, i) => {
          const id = String(i)
          return (
            <PaperCard
              key={paper.url}
              paper={paper}
              onAnalyze={() => onAnalyze(paper, id)}
              isAnalyzing={analyzingPaperId === id}
            />
          )
        })}
      </div>
    </div>
  )
}
