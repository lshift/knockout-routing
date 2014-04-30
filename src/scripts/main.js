requirejs.config({
  shim: {
    'lib/knockout': ['lib/jquery']
  },
  paths: {
    jquery: 'lib/jquery',
    knockout: 'lib/knockout'
  }
});

define(['knockout', 'router'], function(ko, Router) {

	// More specific matches should come first.
  var urlMapping = {
    home:   { match: /^$/,                    page: homePage },
    simple: { match: /^simple$/,              page: simplePage },
    params: { match: /^params\/(.+)\/(\d+)$/, page: paramsPage },
    slow:   { match: /^slow$/,                page: slowPage },
    fail:   { match: /^fail$/,                page: failPage }
  }

  function homePage() {
    return new Router.Page('Home', 'home-template', {});
  }

  function simplePage() {
    return new Router.Page('Simple', 'simple-template', {});
  }

  function paramsPage(param1, param2) {
    return new Router.Page('Params', 'params-template', { param1: param1, param2: param2 });
  }

  function slowPage() {
    // Fake a loading process, so real page shows after 2 seconds.
    // Router will pick up the 'loading' observable by convention.
    var slowModel = { loading: ko.observable(true) };
    window.setTimeout(function() { slowModel.loading(false) }, 2000);
    return new Router.Page('Slow loading', 'slow-template', slowModel);
  }

  function failPage() {
    return new Router.Page('Will it work?', 'simple-template', { error: ko.observable('Deliberate error!') });
  }

  function randomFilter(path) {
    if (Math.random() > 0.8) {
      return new Router.Page('Random filter attacks!', 'random-template', { path: path });
    }
  }

  // This is the KO ViewModel for the whole page, which contains our router, which
  // in turn keeps track of the current page.
  var topLevelModel = { router: new Router(urlMapping, randomFilter) };
  // Make model accessible in global context, purely to aid debugging.
  window.topLevelModel = topLevelModel

  // Need to explicitly bind to 'html' node if we want setting the page title to work.
  ko.applyBindings(topLevelModel, $('html').get(0));
});