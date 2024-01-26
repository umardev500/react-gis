import { popupItem } from '../../atoms'

export const popupContent = (feature: any): string => {
    const {
        PROVINSI: provinsi,
        KABUPATEN: kabupaten,
        KECAMATAN: kecamatan,
        DESA: desa,
        ALAMAT: alamat,
        TGL_BAST: tanggal,
        TAHUN: tahun,
    } = feature.properties

    const popupContent = `
        <div class="popup-flex-container">
        ${popupItem('Provinsi', provinsi)}
        ${popupItem('Kabupaten', kabupaten)}
        ${popupItem('Kecamatan', kecamatan)}
        ${popupItem('Desa', desa)}
        ${popupItem('Alamat', alamat)}
        ${popupItem('Tanggal', tanggal)}
        ${popupItem('Tahun', tahun)}
        </div>
    `

    return popupContent
}
