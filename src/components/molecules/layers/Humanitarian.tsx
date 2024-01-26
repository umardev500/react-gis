import React from 'react'
import { TileLayer } from 'react-leaflet'

export const HumanitarianTileLayer = (): React.ReactNode => {
    return (
        <TileLayer
            url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            key="Street"
        />
    )
}
