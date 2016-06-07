(function ($) {
  
  $(function () {
    Auth('.auth-box');
  });

  function Auth(cnt) {
    var $cnt = $(cnt);
    var $form = $cnt.find('form');
    var $input = $form.find('input');
    const url = 'http://jsonplaceholder.typicode.com/posts/'

    function handleApp() {
      $form.on('submit', function (e) {
        e.preventDefault();
        sendCode($input.val()).then(setSuccessState).fail(setErrorState);
      });
    }

    function sendCode(code) {
      return $.post(url, {code: code});
    }

    function setSuccessState() {
      clearState();
      $cnt.addClass('success');
    }

    function removeSuccessState() {
      clearState()
      $cnt.removeClass('success');
    }

    function setErrorState() {
      clearState();
      $cnt.removeClass('success').addClass
    }

    function clearState() {
      $cnt.removeClass('success error');
    }

    handleApp();
  }

}(jQuery))