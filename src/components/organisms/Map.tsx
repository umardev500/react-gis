import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import { Header, MapChild } from '.'
import { useGetLayer } from '../../hooks/api/GetLayer'
import { type Category, type Layer, type ResponseData } from '../../types'
import { popupContent } from '../molecules/popup'
import { LayersControl as CustomControl } from './LayersControl'
import animData from '../../assets/anim/loading.json'
import Lottie from 'lottie-react'

export const Map = (): React.ReactNode => {
    const [needToShow, setNeedToShow] = useState(false)
    const [selectedLayer, setSelectedLayer] = useState<Layer>('Default')

    const { loading, data } = useGetLayer() // call hooks to get layers
    useEffect(() => {
        if (!loading) {
            const len = data.length
            if (len < 1) setNeedToShow(true)
        }
    }, [loading])

    // Custom marker
    const pointToLayer = (feature: any, latlng: any) => {
        const markerColor = feature?.properties?.['marker-color'] ?? '#ea580c'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const marker = L.marker(latlng, {
            icon: L.divIcon({
                html: `
                <svg display="block" height="36px" width="22px" viewBox="0 0 27 41"><defs><radialGradient id="shadowGradient"><stop offset="10%" stop-opacity="0.4"></stop><stop offset="100%" stop-opacity="0.05"></stop></radialGradient></defs><ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse><path fill="${markerColor}" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path><path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path><circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle></svg>`,
                className: 'svg-icon',
                iconSize: [16, 24], // Adjusted icon size to make it smaller
                iconAnchor: [8, 24], // Adjusted icon anchor point based on new size
            }),
        })

        marker.bindPopup(popupContent(feature), {
            offset: [4, -10],
        })

        return marker
    }

    const [geoJsonDatasets, setGeo] = useState<ResponseData[]>([
        {
            name: 'none',
        },
    ])

    useEffect(() => {
        const geoData = data
        if (data !== undefined) {
            setGeo((prev) => [...prev, ...geoData])
        }
    }, [data])

    // Selected categories
    const [selCat, setSelCat] = useState<Category[]>([])

    return (
        <>
            <Header geoJsonDatasets={geoJsonDatasets} selCat={selCat} setSelCat={setSelCat} />
            <CustomControl setSelectedLayer={setSelectedLayer} />

            {/* Loading */}
            <div
                className={`${!loading ? 'hide-loading' : ''} absolute bg-white z-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center`}
            >
                <Lottie animationData={animData} loop className="w-[180px] lg:w-[280px]" />
            </div>
            {/* End of loading */}

            {/* Map */}
            <MapContainer
                center={[-0.7113503477916671, 119.47647368401239]}
                zoom={6}
                zoomControl={false}
                className="absolute top-16 right-0 bottom-0 left-0 -z-0"
            >
                <MapChild
                    geoJsonDatasets={geoJsonDatasets}
                    selCat={selCat}
                    pointToLayer={pointToLayer}
                    selectedLayer={selectedLayer}
                    needToShow={needToShow}
                />

                <ZoomControl position="bottomright" />
            </MapContainer>
            {/* End of map */}
        </>
    )
}
