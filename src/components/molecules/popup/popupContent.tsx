import { capitalizeFirstLetterOfEachWord } from '../../../utils'
import { popupItem } from '../../atoms'

interface Properties {
    title: string
    value: string
}

const ignoredProperties = ['Marker-Name', 'Marker-Size', 'Marker-Color', 'Marker-Symbol']
const ignoredValues = ['<Null>']

export const popupContent = (feature: any): string => {
    const prop: Properties[] = []

    const data = feature.properties
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key].toString() as string
            if (ignoredValues.includes(value)) {
                continue
            }

            if (!ignoredProperties.map((prop) => prop.toLowerCase()).includes(key.toLowerCase())) {
                prop.push({
                    title: capitalizeFirstLetterOfEachWord(key),
                    value: capitalizeFirstLetterOfEachWord(value),
                })
            }
        }
    }

    const popupContent = `
        <div class="popup-flex-container">
            ${prop
                .map((val) => {
                    return popupItem(val.title, val.value)
                })
                .join('')}
        </div>
    `

    return popupContent
}
