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

  function failPage() {
    return new Router.Page('Will it work?', 'simple-template', { error: ko.observable('Deliberate error!') });
  }

  // This is the KO ViewModel for the whole page.
  var topLevelModel = {
    router: new Router(urlMapping)
  };

  // Need to explicitly bind to 'html' node if we want setting the page title to work.
  ko.applyBindings(topLevelModel, $('html').get(0));

  // Make model accessible in global context, purely to aid debugging.
  window.topLevelModel = topLevelModel
});