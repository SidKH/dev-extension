export function setEntries(entries) {
  return {
    type: 'SET_REQUEST_ENTRIES',
    entries
  }
}

export function sortEntries(sortField, sortType) {
  return {
    type: 'SORT_ENTRIES',
    sortField,
    sortType
  }
}