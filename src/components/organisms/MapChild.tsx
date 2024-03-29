import React, { useEffect, useState } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet'
import geoData from '../../assets/geojson/map.json'
import { type Category, type Layer, type ResponseData } from '../../types'
import { HumanitarianTileLayer, SatelliteTileLayer, StreetTileLayer } from '../molecules/layers'

interface Props {
    geoJsonDatasets: ResponseData[]
    selectedLayer: Layer
    pointToLayer: (feature: any, latlng: any) => L.Marker<any>
    selCat: Category[]
    needToShow: boolean
}
export const MapChild: React.FC<Props> = (props) => {
    const { geoJsonDatasets, selectedLayer, pointToLayer, selCat, needToShow } = props

    // Filtered data
    const [filData, setFilData] = useState<ResponseData[]>([])
    const [ovLayer, setOvLayer] = useState<React.ReactNode[]>([])

    // Watch fitler change
    // useEffect(() => {
    //     const filteredData = geoJsonDatasets.map((dataset) => {
    //         if (dataset.data !== undefined) {
    //             const cat = selCat.find((cat) => cat.name === dataset.name)

    //             return {
    //                 ...dataset,
    //                 data: {
    //                     ...dataset.data,
    //                     features: groupFeatures(dataset.data.features, cat?.categories),
    //                 },
    //             }
    //         } else {
    //             return dataset
    //         }
    //     })

    //     setFilData(filteredData)
    // }, [selCat])

    const geoJSONStyle = {
        fillColor: 'rgba(251, 146, 60, 0.4)', // Set the fill color
        color: 'rgba(251, 146, 60, 1)', // Set the border color
        weight: 2, // Set the border weight
        opacity: 1, // Set the border opacity
        fillOpacity: 0.7, // Set the fill opacity
    }

    // Get data
    useEffect(() => {
        const filteredData = geoJsonDatasets.map((dataset) => {
            const datasetName = dataset.name.toLowerCase().trim()
            if (dataset.data !== undefined && dataset.data.length > 0) {
                const cat = selCat.find((cat) => cat.name.toLowerCase().trim() === datasetName)

                return {
                    ...dataset,
                    data: dataset.data.filter((val) => {
                        const valName = val.name.toLowerCase().trim()

                        return cat?.categories.some(
                            (category) => category.toLowerCase().trim() === valName
                        )
                    }),
                }
            }

            return dataset
        })

        setFilData(filteredData)
    }, [selCat])

    useEffect(() => {
        const newOverlayLayers = filData.map((val, i) => {
            const data = val.data

            return (
                <LayersControl.Overlay key={i} checked={i === 1} name={i.toString()}>
                    {data?.map((item) => {
                        if (item.name === 'none') return null

                        const keyGen = Math.random().toString()
                        return (
                            <GeoJSON
                                key={keyGen}
                                pointToLayer={pointToLayer}
                                style={geoJSONStyle}
                                data={item.features as any}
                            />
                        )
                    })}
                </LayersControl.Overlay>
            )
        })

        setOvLayer(newOverlayLayers)
    }, [filData])

    return (
        <LayersControl>
            <LayersControl.BaseLayer checked={selectedLayer === 'Default'} name="Street">
                <StreetTileLayer />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked={selectedLayer === 'Humanitarian'} name="Humanitarian">
                <HumanitarianTileLayer />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked={selectedLayer === 'Satellite'} name="Satellite">
                <SatelliteTileLayer />
            </LayersControl.BaseLayer>

            {ovLayer}

            {needToShow ? (
                <>
                    <LayersControl.Overlay checked name={'Bantuan Pemerintah'}>
                        <GeoJSON pointToLayer={pointToLayer} data={geoData as any} />
                    </LayersControl.Overlay>
                </>
            ) : null}
        </LayersControl>
    )
}
