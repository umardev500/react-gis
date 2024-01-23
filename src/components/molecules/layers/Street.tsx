import React from 'react'
import { TileLayer } from 'react-leaflet'

export const StreetTileLayer = (): React.ReactNode => {
    return (
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            key="Street"
        />
    )
}
