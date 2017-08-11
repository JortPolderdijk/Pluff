(function () {

  "use strict";

  // Vars
  const $body = $('body');
  const $loadingScreen = $('.page-load-animation');

  const $searchTogglerDiv = '.search-toggler';
  const $searchBar = $('.search');
  const $profileItem = $('.profile');
  let searchActive = false;

  // Breakpoints
  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  // Disable animations/transitions until everything's loaded
  $body.addClass('is-loading');

  $(document).ready(function () {
    $body.removeClass('is-loading');
    $loadingScreen.addClass('is-loaded');
  });

})();
