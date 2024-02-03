// import { type ResponseData, type GeoFeature } from '../types'

// export interface Keys {
//     name: string
//     cateogories?: string[]
// }

// // export const getKeys = (data: ResponseData[]): Keys[] => {
// //     const newData: Keys[] = data.map((item) => ({
// //         name: item.name,
// //     }))

// //     data.forEach((res, i) => {
// //         const features = res.data?.features

// //         if (features !== undefined) {
// //             const groupedData = groupData(features)
// //             const keys = Object.keys(groupedData)
// //             newData[i].cateogories = keys
// //         }
// //     })

// //     return newData
// // }

// // type GroupData = Record<string, GeoFeature[]>
// // const groupData = (features: GeoFeature[]): GroupData => {
// //     const groupedData = features.reduce<Record<string, GeoFeature[]>>((acc, feature) => {
// //         const category = feature.properties.kategori.toLowerCase().trim()
// //         if (!acc[category]) {
// //             acc[category] = []
// //         }

// //         acc[category].push(feature)

// //         return acc
// //     }, {})

// //     return groupedData
// // }

// // export const groupFeatures = (features: GeoFeature[], categories?: string[]): GeoFeature[] => {
// //     const groupedData = groupData(features)

// //     // const filterKeys = Object.keys(groupedData)

// //     let newFeatures: GeoFeature[] = []

// //     categories?.forEach((cat) => {
// //         if (Object.prototype.hasOwnProperty.call(groupedData, cat)) {
// //             newFeatures = newFeatures.concat(groupedData[cat])
// //         }
// //     })

// //     // console.log(filterKeys)
// //     return newFeatures
// // }
