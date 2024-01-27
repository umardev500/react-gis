import { useEffect, useState } from 'react'
import { type GeoJSON, type LayerResponse } from '../../types'

export const useGetLayer = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<GeoJSON[]>([])

    useEffect(() => {
        const url = 'https://kkp.komit.co.id/api/layer'
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const data: LayerResponse = await res.json()
                const layers: GeoJSON[] = data.data
                setTimeout(() => {
                    setData(layers)
                }, 2000)
            } catch (err) {
                console.log(err)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        }

        fetchData()
    }, [])

    return { loading, data }
}
