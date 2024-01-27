import { type GeoJSONFeature } from '../../../types'
import { popupItem } from '../../atoms'

export const popupContent = (feature: any): string => {
    const newFeature = feature as GeoJSONFeature

    const { PROVINSI, KABUPATEN, KECAMATAN, DESA, ALAMAT, TGL_BAST, TAHUN } = newFeature.properties

    const popupContent = `
        <div class="popup-flex-container">
        ${popupItem('Provinsi', PROVINSI)}
        ${popupItem('Kabupaten', KABUPATEN)}
        ${popupItem('Kecamatan', KECAMATAN)}
        ${popupItem('Desa', DESA)}
        ${popupItem('Alamat', ALAMAT)}
        ${popupItem('Tanggal', TGL_BAST)}
        ${popupItem('Tahun', TAHUN)}
        </div>
    `

    return popupContent
}
