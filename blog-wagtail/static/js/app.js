var blogApp = angular.module('blog', [
  'ngMdIcons',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'blogControllers',
  'blogServices',
  'ngRoute',
  'ngDisqus',
  'ngSanitize',
  'infinite-scroll',
  'angularLoad',
  'hljs',
]);

blogApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
});

blogApp.config(function($disqusProvider) {
  $disqusProvider.setShortname('pythonified');
});

blogApp.config(['$compileProvider', function ($compileProvider) {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
}]);

blogApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

blogApp.filter('object2Array', function() {
  return function(input) {
    var out = [];
    for(i in input){
      out.push(input[i]);
    }
    return out;
  }
});

blogApp.filter('orderObjectBy', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
      array.push(input[objectKey]);
    }

    array.sort(function(a, b){
      a = parseInt(a[attribute]);
      b = parseInt(b[attribute]);
      return a - b;
    });
    return array;
  }
});

blogApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/about', {
      templateUrl: 'home_page.html',
      activetab: 'about',
      title: 'About',
      controller: 'HomeCtrl'
    }).
    when('/blog', {
      templateUrl: 'blog_index_page.html',
      controller: 'BlogIndexCtrl',
      activetab: 'blog',
      title: 'Blog',
      category: 'all'
    }).
    when('/blog?category=:category', {
      templateUrl: 'blog_index_page.html',
      title: 'Blog',
      category: 'filtering',
      controller: 'BlogIndexCtrl'
    }).
    when('/blog?author=:author', {
      templateUrl: 'blog_index_page.html',
      title: 'Blog',
      controller: 'BlogIndexCtrl'
    }).
    when('/blog/:postTitle', {
      templateUrl: 'blog_post_page.html',
      controller: 'PostCtrl',
      title: 'Blog',
      activetab: 'blog',
      postTitle: function (params) {return params.postTitle}
    }).
    when('/portofolio', {
      templateUrl: 'portofolio_page.html',
      controller: 'PortofolioCtrl',
      title: 'Portofolio',
      activetab: 'portofolio',
    }).
    otherwise({
      redirectTo: '/about'
    });
    $locationProvider
      .html5Mode(true);
  }
]);

blogApp.run(['$rootScope', '$routeParams',
  function($rootScope, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      var unSlugify = function(title) {
        return title
          .replace(/-/g,' ')
          .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        ;
      };

      if(current.$$route.postTitle) {
        $rootScope.title = current.$$route.title + ' | ' + unSlugify($routeParams.postTitle);
      }
      else {
        $rootScope.title = current.$$route.title;
      }
    });
  }
]);

blogApp.directive('loadPretty', function($timeout) {
  return {
    link : function($scope, element, attrs) {
      element.append('<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=desert"></script>');
    }
  };
});

blogApp.config(function (hljsServiceProvider) {
  hljsServiceProvider.setOptions({
    // replace tab with 4 spaces
    tabReplace: '    '
  });
});

blogApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('blue-grey')
    .warnPalette('indigo');
});
