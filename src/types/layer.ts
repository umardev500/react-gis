export interface LayerResponse {
    message: string
    data: GeoJSON[]
}

export interface GeoJSON {
    name: string
    features: GeoJSONFeature[]
}

export interface GeoJSONFeature {
    type: string
    properties: {
        'marker-color': string

        // additional properties
        FCODE: string | null
        LCODE: string | null
        PROVINSI: string
        KABUPATEN: string
        KECAMATAN: string
        DESA: string
        METADATA: string | null
        REFERENSI: string | null
        NAMABP_PT: string
        KATEGORIPN: string
        KELOMPOKPN: string
        KETUAPN: string
        ALAMAT: string
        VOLUME: number
        SATUAN: string
        NILAIBP: number
        SATKERPEMB: string
        NO_BAST: string
        TGL_BAST: string
        TAHUN: string
        REMARK: string
    }
    geometry: {
        type: string
        coordinates: [number, number]
    }
}
