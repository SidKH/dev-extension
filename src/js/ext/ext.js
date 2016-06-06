let panelWindow;

window.chrome.devtools.panels.create("JC panel",
  "icon.png",
  "index.html",
  function (panel) {
    panel.onShown.addListener(function tmp(wnd) {
      panel.onShown.removeListener(tmp);
      panelWindow = wnd;
      getDomainName().then(function (result) {
        panelWindow.startApp(result);
      });
    });
    chrome.devtools.network.onNavigated.addListener(function () {
      getDomainName().then(function (result) {
        panelWindow.startApp(result);
      });
    });
  }
);

function getDomainName() {
  return new Promise(function (resolve, reject) {
    chrome.devtools.inspectedWindow.eval(
      'window.location.origin',
      function (result) {
        resolve(result);
      }
    )
  });
}