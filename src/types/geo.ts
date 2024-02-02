export interface ResponseData {
    name: string
    data?: Geo
}

export interface Geo {
    type: string
    features: GeoFeature[]
}

export interface GeoFeature {
    type: string
    properties: {
        kategori: string
    }
    geometry: {
        coordinates: number[]
        type: string
    }
    id: number
}
