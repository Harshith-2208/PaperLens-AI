"use client"

import API from "../services/api"

export default function PaperCard({paper,setAnalysis}:any){

const analyzePaper = async () => {

const res = await API.post("/analyze-url", null, {
params:{ pdf_url: paper.pdf }
})

setAnalysis(res.data)

}

return(

<div style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

<h3>{paper.title}</h3>

<p>{paper.abstract}</p>

<button onClick={analyzePaper}>
Analyze Paper
</button>

<a href={paper.url} target="_blank">
View Paper
</a>

</div>

)

}