(function () {

  "use strict";

  // Vars
  const $body = $('body');
  const $loadingScreen = $('.page-load-animation');

  const $searchTogglerDiv = '.search-toggler';
  const $searchBar = $('.search');
  const $profileItem = $('.profile');
  let searchActive = false;

  // Disable animations/transitions until everything's loaded
  $body.addClass('is-loading');

  $(document).ready(function () {
    $body.removeClass('is-loading');
    $loadingScreen.addClass('is-loaded');
  });

})();
