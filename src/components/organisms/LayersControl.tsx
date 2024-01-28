import React, { useCallback, useEffect, useRef, useState } from 'react'
import defaultLayer from '../../assets/icons/layer-default.png'
import layersIcon from '../../assets/icons/layers.png'
import satelliteLayer from '../../assets/icons/satellite.png'
import humanLayer from '../../assets/icons/humanitarian.png'
import { type Layer } from '../../types'

interface Props {
    setSelectedLayer: React.Dispatch<React.SetStateAction<Layer>>
}

interface LayerType {
    name: Layer
    imgSrc: string
}

export const LayersControl: React.FC<Props> = ({ setSelectedLayer }) => {
    // State
    const [isShow, setIsShow] = useState(false)

    // Refs
    const parentRef = useRef<HTMLDivElement>(null)

    const toggleMenu = useCallback(() => {
        setIsShow((prev) => !prev)
    }, [])

    const layers: LayerType[] = [
        {
            name: 'Default',
            imgSrc: defaultLayer,
        },
        {
            name: 'Humanitarian',
            imgSrc: humanLayer,
        },
        {
            name: 'Satellite',
            imgSrc: satelliteLayer,
        },
        // Add more layers as needed
    ]

    const handleClickOutside = (event: MouseEvent) => {
        if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div ref={parentRef} className="z-50 fixed bottom-4 left-4 items-end gap-2 inline-flex">
            <div
                onClick={toggleMenu}
                className="layers-menu cursor-pointer h-12 w-12 flex items-center justify-center rounded-lg border-2 border-gray-400"
            >
                <img src={layersIcon} alt="layers" />
            </div>

            <div
                className={`${isShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all left-full flex gap-2 bg-white px-2 py-2 rounded-lg shadow-lg ml-2 absolute`}
            >
                {layers.map((val, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            toggleMenu()
                            setSelectedLayer(val.name)
                        }}
                        className={`w-12 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all`}
                    >
                        <img className="w-12 cursor-pointer" src={val.imgSrc} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}
