export function getData (url) {
  return function (dispatch) {
    dispatch(startLoader());
    $.get(url).then((data) => {
      dispatch(renderData(data));
      dispatch(stopLoader());
    });
  }
}

export function renderData(data) {
  return {
    type: 'RENDER_DATA',
    data
  }
}

export function startLoader() {
  return {
    type: 'START_LOADER'
  }
}

export function stopLoader() {
  return {
    type: 'STOP_LOADER'
  }
}