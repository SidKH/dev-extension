export function setInfoBoxContent(data) {
  return {
    type: 'SET_INFOBOX_CONTENT',
    data
  }
}

export function unsetInfoBoxContent() {
  return {
    type: 'UNSET_INFOBOX_CONTENT'
  }
}

export function setTab(index) {
  return {
    type: 'SET_TAB',
    index
  }
}