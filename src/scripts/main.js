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
    home: { match: /^$/,       page: homePage },
    foo:  { match: /^foo$/,    page: fooPage },
    bar:  { match: /^bar$/,    page: barPage },
  }

  function homePage() {
    return new Router.Page('home-template', {});
  }

  function fooPage() {
    return new Router.Page('foo-template', {});
  }

  function barPage() {
    return new Router.Page('bar-template', {});
  }

  // This is the KO ViewModel for the whole page.
  var topLevelModel = {
    router: new Router(urlMapping)
  };

  ko.applyBindings(topLevelModel);

  // Make model accessible in global context, purely to aid debugging.
  window.topLevelModel = topLevelModel
});