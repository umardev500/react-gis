import { useEffect, useState } from 'react'
import { type LayerResponse, type ResponseData } from '../../types'

export const useGetLayer = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ResponseData[]>([])
    const api = import.meta.env.VITE_API

    useEffect(() => {
        const url = `${api}/layer`
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const data: LayerResponse = await res.json()
                const layers: ResponseData[] = data.data
                setTimeout(() => {
                    setData(layers)
                }, 1000)
            } catch (err) {
                console.log(err)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }

        fetchData()
    }, [])

    return { loading, data }
}
