import { useEffect, useState } from 'react'
import { type GeoJSON, type LayerResponse } from '../../types'

export const useGetLayer = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<GeoJSON[]>([])
    const api = import.meta.env.VITE_API

    useEffect(() => {
        const url = `${api}/layer`
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const data: LayerResponse = await res.json()
                const layers: GeoJSON[] = data.data
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
