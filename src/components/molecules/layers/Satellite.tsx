import React from 'react'
import { TileLayer } from 'react-leaflet'

export const SatelliteTileLayer = (): React.ReactNode => {
    return (
        <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri</a>'
            key="Satellite"
        />
    )
}
