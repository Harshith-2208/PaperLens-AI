import { useState } from "react"
import API from "../services/api"
import { Paper } from "../types"

export default function useSearch() {

  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const search = async (query: string) => {

    setIsLoading(true)

    try {

      let res

      if (!query || query.trim() === "") {
        res = await API.get("/trending")
      } else {
        res = await API.get("/search", {
          params: { query }
        })
      }

      setPapers(res.data)

    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)

  }

  return { papers, search, isLoading }
}