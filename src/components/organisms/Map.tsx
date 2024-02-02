import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GeoJSON, LayersControl, MapContainer, ZoomControl } from 'react-leaflet'
import geoData from '../../assets/geojson/map.json'
import { HumanitarianTileLayer, SatelliteTileLayer, StreetTileLayer } from '../molecules/layers'
import { popupContent } from '../molecules/popup'
import { useGetLayer } from '../../hooks/api/GetLayer'
import Lottie from 'lottie-react'
import animData from '../../assets/anim/anim-5.json'
import { useEffect, useState } from 'react'
import { LayersControl as CustomControl } from './LayersControl'
import { Category, Geo, Layer, ResponseData } from '../../types'
import { Header } from '.'
import dummyData from '../../assets/geojson/dummy.json'
import { Keys, getKeys, groupFeatures } from '../../utils'

export const Map = (): React.ReactNode => {
    const [needToShow, setNeedToShow] = useState(false)
    const [selectedLayer, setSelectedLayer] = useState<Layer>('Default')

    const { loading, data } = useGetLayer()
    useEffect(() => {
        if (!loading) {
            const len = data.length
            if (len < 1) setNeedToShow(true)
        }
    }, [loading])

    const pointToLayer = (feature: any, latlng: any) => {
        const markerColor = feature.properties['marker-color'] || '#ea580c'
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

    const geoJsonDatasets: ResponseData[] = [
        {
            name: 'Geo 1',
        },
        {
            name: 'bantuan',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            kategori: 'Jalan',
                        },
                        geometry: {
                            coordinates: [115.7463895815444, -2.7746246962266525],
                            type: 'Point',
                        },
                        id: 0,
                    },
                    {
                        type: 'Feature',
                        properties: {
                            kategori: 'sarana prasarana',
                        },
                        geometry: {
                            coordinates: [112.7142735198754, -1.1744708839206623],
                            type: 'Point',
                        },
                        id: 1,
                    },
                ],
            },
        },
    ]

    // Selected categories
    const [selCat, setSelCat] = useState<Category[]>([
        {
            name: 'Geo 1',
            categories: ['foo', 'bar'],
        },
        {
            name: 'bantuan',
            categories: ['jalan', 'sarana prasarana'],
        },
    ])
    // Filtered data
    const [filData, setFilData] = useState<ResponseData[]>([])

    // Watch fitler change
    useEffect(() => {
        const filteredData = geoJsonDatasets.map((dataset) => {
            if (dataset.data !== undefined) {
                const cat = selCat.find((cat) => cat.name === dataset.name)

                return {
                    ...dataset,
                    data: {
                        ...dataset.data,
                        features: groupFeatures(dataset.data.features, cat?.categories),
                    },
                }
            } else {
                return dataset
            }
        })

        setFilData(filteredData)
    }, [selCat])

    // Keys
    const [keys, setKeys] = useState<Keys[]>([])

    // Get keys
    useEffect(() => {
        const keysData = getKeys(geoJsonDatasets)
        setKeys(keysData)
    }, [])

    return (
        <>
            <Header keys={keys} />
            <CustomControl setSelectedLayer={setSelectedLayer} />

            {/* <div
                className={`${!loading ? 'hide-loading' : ''} absolute bg-white z-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center`}
            >
                <Lottie animationData={animData} loop className="w-1/3 lg:w-[180px]" />
            </div> */}

            <MapContainer
                center={[-0.7113503477916671, 119.47647368401239]}
                zoom={6}
                zoomControl={false}
                className="absolute top-0 right-0 bottom-0 left-0 -z-0"
            >
                <LayersControl>
                    <LayersControl.BaseLayer checked={selectedLayer === 'Default'} name="Street">
                        <StreetTileLayer />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer
                        checked={selectedLayer === 'Humanitarian'}
                        name="Humanitarian"
                    >
                        <HumanitarianTileLayer />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer
                        checked={selectedLayer === 'Satellite'}
                        name="Satellite"
                    >
                        <SatelliteTileLayer />
                    </LayersControl.BaseLayer>

                    {/* <LayersControl.Overlay checked name={'Bantuan'}>
                        <GeoJSON pointToLayer={pointToLayer} data={dummyData as any} />
                    </LayersControl.Overlay> */}

                    {filData.map((val, i) => (
                        <LayersControl.Overlay key={i} checked name={i.toString()}>
                            <GeoJSON pointToLayer={pointToLayer} data={val.data?.features as any} />
                        </LayersControl.Overlay>
                    ))}

                    {/* {data.map((val, i) => (
                        <LayersControl.Overlay key={i} checked name={val.name}>
                            <GeoJSON pointToLayer={pointToLayer} data={val.features as any} />
                        </LayersControl.Overlay>
                    ))}

                    {needToShow ? (
                        <>
                            <LayersControl.Overlay checked name={'Bantuan Pemerintah'}>
                                <GeoJSON pointToLayer={pointToLayer} data={geoData as any} />
                            </LayersControl.Overlay>
                        </>
                    ) : null} */}
                </LayersControl>

                <ZoomControl position="bottomright" />
            </MapContainer>
        </>
    )
}
