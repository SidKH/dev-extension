export function setInfoBoxContent(data) {
  return {
    type: 'SET_INFOBOX_CONTENT',
    data
  }
}

export function setTab(index) {
  return {
    type: 'SET_TAB',
    index
  }
}