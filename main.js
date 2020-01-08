if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js')
    .then(function () {
      console.log('Service worker running');
    })
    .catch(function (err) {
      console.log(err);
    })
  });
}

