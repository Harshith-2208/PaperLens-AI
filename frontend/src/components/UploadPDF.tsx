"use client"

import {useState} from "react"
import API from "../services/api"

export default function UploadPDF({setFilename}:{setFilename:any}){

const[file,setFile]=useState<File|null>(null)

const upload=async()=>{

if(!file)return

const formData=new FormData()
formData.append("file",file)

const res=await API.post("/upload",formData)

setFilename(res.data.filename)
}

return(
<div>

<input
type="file"
onChange={(e)=>setFile(e.target.files?.[0]||null)}
/>

<button onClick={upload}>
Upload PDF
</button>

</div>
)
}