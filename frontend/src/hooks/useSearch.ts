import {useState} from "react"
import API from "../services/api"

export default function useSearch(){

const[papers,setPapers]=useState([])

const search=async(query:string)=>{

const res=await API.get(`/search?query=${query}`)
console.log(res.data)
setPapers(res.data)
}

return{papers,search}
}