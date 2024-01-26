export const popupItem = (title: any, value: any): string => {
    return `
    <div class="popup-grid-item">
      <div class="popup-title">${title}</div>
      <div class="popup-colon">:</div>
      <div class="popup-value">${value}</div>
    </div>
    `
}
