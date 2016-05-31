let initialState = {
  activeTab: 0,
  content: null
}

function InfoBoxReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_INFOBOX_CONTENT': {
      return Object.assign({}, state, {content: [...action.data]});
    }
    case 'UNSET_INFOBOX_CONTENT': {
      return Object.assign({}, state, {content: null});
    }
    case 'SET_TAB': {
      return Object.assign({}, state, {activeTab: action.index});
    }
    default:
      return state;
  }
}

export { InfoBoxReducer };