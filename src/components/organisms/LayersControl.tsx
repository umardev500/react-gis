import { useCallback, useState } from 'react'
import defaultLayer from '../../assets/icons/layer-default.png'
import layersIcon from '../../assets/icons/layers.png'
import satelliteLayer from '../../assets/icons/satellite.png'

export const LayersControl = () => {
    const [isShow, setIsShow] = useState(false)

    const handleShow = useCallback(() => {
        setIsShow((prev) => !prev)
    }, [])

    const layers = [
        {
            name: 'Standard',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            imgSrc: defaultLayer,
        },
        {
            name: 'Satellite',
            url: 'https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            imgSrc: satelliteLayer,
        },
        // Add more layers as needed
    ]

    return (
        <div className="z-50 fixed bottom-4 left-4 items-end gap-2 inline-flex">
            <div
                onClick={handleShow}
                className="bg-white cursor-pointer h-12 w-12 flex items-center justify-center rounded-lg border-2 border-gray-400"
            >
                <img src={layersIcon} alt="layers" />
            </div>

            <div
                onClick={() => {
                    setIsShow(false)
                }}
                className={`${isShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all left-full flex gap-2 bg-white px-2 py-2 rounded-lg shadow-lg ml-2 absolute`}
            >
                {layers.map((val, i) => (
                    <div
                        key={i}
                        className={`w-12 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all`}
                    >
                        <img className="w-12 cursor-pointer" src={val.imgSrc} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}
