
Knockout Routing Example
========================

A demonstration of how a very simple hash-based router can provide quite a lot of nice page routing functionality:

 - Back and forward work, as does bookmarking, page-refresh, emailing links etc.
 - Regexes for URL matching
 - Extract parts from URL simply by declaring groups in the Regex
 - Filter all requests to intercept as necessary - e.g. for auth
 - Links can be just plain `<a href="#foo">Foo</a>` with no JS required (but no support for bidirectional routing)
 - 404 page where no match found
 - Common error page shown when current page's error property is set
 - Common loading page shown when current page's loading property is set.

You should be able to simply double click **src/index.html** to open it in your browser and play with it. The examples are fairly self-explanatory. A Gruntfile with live-reloading demo web server is also provided, which was used whilst developing this example.

The interesting files are:

 - **src/scripts/router.js**: defines Router and Router.Page
 - **src/scripts/main.js**: demonstrates how to use the Router, providing a URL mapping that shows off the various features
 - **src/index.html**: demonstrates how to use Knockout binding so that the Router controls the page content that is shown, with templates inline, including those that the Router expects to exist (404, error, loading).
