import { popupItem } from '../../atoms'

export const popupContent = (feature: any): string => {
    const {
        nama,
        jenis_bantuan: jenisBantuan,
        provinsi,
        kabupaten,
        kecamatan,
        alamat,
        tanggal,
        tahun,
    } = feature.properties

    const popupContent = `
        <div class="popup-flex-container">
        ${popupItem('Nama', nama)}
        ${popupItem('Jenis Bantuan', jenisBantuan)}
        ${popupItem('Provinsi', provinsi)}
        ${popupItem('Kabupaten', kabupaten)}
        ${popupItem('Kecamatan', kecamatan)}
        ${popupItem('Alamat', alamat)}
        ${popupItem('Tanggal', tanggal)}
        ${popupItem('Tahun', tahun)}
        </div>
    `

    return popupContent
}
