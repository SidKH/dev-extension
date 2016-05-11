export function getData (url, fn) {
  return function (dispatch) {
    dispatch(startLoader());
    $.get(url).then((data) => {
      dispatch(fn(data));
      dispatch(stopLoader());
    });
  }
}