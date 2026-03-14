import PaperCard from "./PaperCard"

export default function PaperList({papers,setAnalysis}:any){

return(

<div>

{papers.map((paper:any,i:number)=>(
<PaperCard key={i} paper={paper} setAnalysis={setAnalysis}/>
))}

</div>

)

}