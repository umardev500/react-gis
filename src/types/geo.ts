export interface ResponseData {
    name: string
    data?: Geo[]
}

export interface Geo {
    type: string
    name: string
    features: GeoFeature[]
}

export interface GeoFeature {
    type: string
    properties: any
    geometry: {
        coordinates: number[]
        type: string
    }
    id: number
}
