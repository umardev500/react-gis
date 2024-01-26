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
                setData(layers)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { loading, data }
}
