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
    home:    { match: /^$/,                    page: homePage },
    simple:  { match: /^simple$/,              page: simplePage },
    params:  { match: /^params\/(.+)\/(\d+)$/, page: paramsPage },
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

  // This is the KO ViewModel for the whole page.
  var topLevelModel = {
    router: new Router(urlMapping)
  };

  ko.applyBindings(topLevelModel);

  // Make model accessible in global context, purely to aid debugging.
  window.topLevelModel = topLevelModel
});