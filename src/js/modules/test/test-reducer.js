import opts from './test-data.json';
const loaderInit = {
  isLoading: false
}

function testReducer(state = {}, action) {
  return {
    opts: opts,
    data: dataReducer(state.data, action),
    loader: loaderReducer(state.loader, action)
  }
}

function loaderReducer(state = loaderInit, action) {
  switch (action.type) {
    case 'START_LOADER': {
      return {isLoading: true}
    }
    case 'STOP_LOADER': {
      return {isLoading: false}
    }
    default:
      return state;
  }
}

function dataReducer(state = null, action) {
  switch (action.type) {
    case 'RENDER_DATA': {
      return action.data;
    }
    default:
      return state;
  }
}

export { testReducer }