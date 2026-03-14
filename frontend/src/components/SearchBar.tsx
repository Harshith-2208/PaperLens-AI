"use client"

import { useState } from "react"

interface Props{
  onSearch:(query:string)=>void
}

export default function SearchBar({onSearch}:Props){

const [query,setQuery]=useState("")

return(
<div>

<input
value={query}
onChange={(e)=>setQuery(e.target.value)}
placeholder="Search research papers"
/>

<button onClick={()=>onSearch(query)}>
Search
</button>

</div>
)
}