"use client"

import ReactMarkdown from "react-markdown"

export default function AnalysisPanel({ analysis }: { analysis: any }) {

if (!analysis) return null

const text = analysis.analysis || ""

return (

<div style={{ marginTop: "40px" }}>

<h2 style={{ marginBottom: "20px" }}>Paper Analysis</h2>

<div
style={{
background: "#111",
padding: "20px",
borderRadius: "10px",
lineHeight: "1.7",
color: "#ddd",
overflowY: "auto"
}}
>

<ReactMarkdown
components={{

h1: ({children}) => (
<h1 style={{fontSize:"28px",fontWeight:"bold",marginTop:"20px"}}>
{children}
</h1>
),

h2: ({children}) => (
<h2 style={{fontSize:"24px",fontWeight:"bold",marginTop:"20px"}}>
{children}
</h2>
),

h3: ({children}) => (
<h3 style={{
fontSize:"20px",
fontWeight:"bold",
marginTop:"18px",
color:"#4da6ff"
}}>
{children}
</h3>
),

p: ({children}) => (
<p style={{marginTop:"10px"}}>
{children}
</p>
),

ol: ({children}) => (
<ol style={{
marginLeft:"25px",
marginTop:"10px",
listStyleType:"decimal"
}}>
{children}
</ol>
),

ul: ({children}) => (
<ul style={{
marginLeft:"25px",
marginTop:"10px",
listStyleType:"disc"
}}>
{children}
</ul>
),

li: ({children}) => (
<li style={{marginTop:"6px"}}>
{children}
</li>
)

}}
>
{text}
</ReactMarkdown>

</div>

</div>

)
}