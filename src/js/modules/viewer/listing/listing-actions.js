export function setEntries(entries) {
  return {
    type: 'SET_REQUEST_ENTRIES',
    entries
  }
}

export function sortEntries(field) {
  return {
    type: 'SORT_ENTRIES',
    field
  }
}