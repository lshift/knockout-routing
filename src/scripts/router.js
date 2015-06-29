define(['knockout', 'jquery'], function(ko, $) {

  // Top-level KO ViewModel that detects URL changes and shows the relevant page.
  function Router(urlMapping, filter) {
    var self = this;
    this.urlMapping = urlMapping;

    // We swap in Page instances here to make them the current page.
    this.currentPage = ko.observable(null);

    // Listen for changes to the URL fragment (hash) triggered by links, back/forward etc.
    // and make the relevant Page instance current.
    $(window).bind("hashchange", function() {
      // Use the path between # and ? (if present).
      // Note that when URL ends with just #, some browsers return '' for location.hash, others return '#'
      // but either way substr(1) will return '' which is what we want.
      var path = location.hash.substr(1).split('?')[0];

      var pageFromFilter = filterPath(path);
      if (pageFromFilter) {
        self.currentPage(pageFromFilter);
      } else {
        self.currentPage(pageFromMapping(path));
      }
    });

    function filterPath(path) {
      return (typeof(filter) !== 'undefined') ? filter(path) : null;
    }

    function pageFromMapping(path) {
      for (key in self.urlMapping) {
        var mapping = self.urlMapping[key];
        var matches = mapping.match.exec(decodeURIComponent(path));
        if (matches) {
          // Pass the group matches from the regex.
          return mapping.page.apply(this, matches.slice(1));
        }
      }
      return new Router.Page('404 - Not Found', '404-template', {});
    }

    // Manually trigger initial load of the relevant start page.
    $(window).trigger("hashchange");
  }

  // A 'page' that can be shown, encompassing the view (string identifying a template),
  // model (a KO ViewModel) and title.
  Router.Page = function(title, view, model) {
    this.title = ko.observable(title);
    this.view = ko.computed( function() {
      // If model has an error or loading property, respect it.
      if (model.error && model.error()) return 'error-template';
      if (model.loading && model.loading()) return 'loading-template';
      return view;
    });
    this.model = ko.observable(model);
  }

  return Router;
});