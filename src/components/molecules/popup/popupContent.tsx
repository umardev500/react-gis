import { capitalizeFirstLetterOfEachWord } from '../../../utils'
import { popupItem } from '../../atoms'

interface Properties {
    title: string
    value: string
}

export const popupContent = (feature: any): string => {
    const prop: Properties[] = []

    const data = feature.properties
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key]
            prop.push({
                title: capitalizeFirstLetterOfEachWord(key),
                value: capitalizeFirstLetterOfEachWord(value as string),
            })
        }
    }

    const popupContent = `
        <div class="popup-flex-container">
            ${prop.map((val) => popupItem(val.title, val.value)).join('')}
        </div>
    `

    return popupContent
}
