// Активация/деактивация страницы

'use strict';

(function () {
  var isPageActivated = false;
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var mainPin = document.querySelector('.map__pin--main');
  var xMainPin = mainPin.offsetLeft;
  var yMainPin = mainPin.offsetTop;

  function preparePage() {
    map.classList.remove('map--faded');
    var ads = window.data();
    window.pinDrawElements(ads);
  }

  function clearMap() {
    var curPins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    curPins.forEach(function (item) {
      item.remove();
    });
  }

  window.setupActivatePage = function () {
    isPageActivated = true;
    preparePage();
    window.formActivateFilterForm();
    window.formActivateAdForm();
    window.setupIsPageActivated = isPageActivated;
    adFormResetButton.addEventListener('click', onResetClick);
  };

  function deactivatePage() {
    isPageActivated = false;
    map.classList.add('map--faded');
    clearMap();
    window.formDeactivateAdForm();
    window.formDeactivateFilterForm();
    window.setupIsPageActivated = isPageActivated;
    adFormAddress.value = xMainPin + ', ' + yMainPin;
  }

  function onResetClick() {
    deactivatePage();
    mainPin.style.left = xMainPin + 'px';
    mainPin.style.top = yMainPin + 'px';
  }

  deactivatePage();
})();
