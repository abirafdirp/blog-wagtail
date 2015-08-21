var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices',
  'ngRoute',
	'ngDisqus',
  'ngSanitize',
	'infinite-scroll'
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
	    	when('/home', {
				templateUrl: 'home_page',
				activetab: 'home',
				title: 'Home',
				controller: 'HomeCtrl'
			}).
	    	when('/blog', {
				templateUrl: 'blog_page',
				controller: 'BlogIndexCtrl',
				activetab: 'blog',
				title: 'Blog',
				category: 'all'
			}).
			when('/blog?category=:category', {
				templateUrl: 'blog_page',
				title: 'Blog',
				category: 'filtering',
				controller: 'BlogIndexCtrl'
			}).
			when('/blog?author=:author', {
				templateUrl: 'blog_page',
				title: 'Blog',
				controller: 'BlogIndexCtrl'
			}).
			when('/blog/:postTitle', {
				templateUrl: function (params) {return 'blog_page/'+params.postTitle},
				controller: 'PostCtrl',
				title: 'Blog',
				activetab: 'blog',
				postTitle: function (params) {return params.postTitle}
			}).
			when('/about', {
				templateUrl: 'about',
				controller: 'AboutCtrl',
				activetab: 'about',
			}).
			when('/portofolio', {
				templateUrl: 'portofolio_page',
				controller: 'PortofolioCtrl',
				title: 'Portofolio',
				activetab: 'portofolio',
			}).
			otherwise({
				redirectTo: '/home'
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

blogApp.directive('loadPretty',
	function() {
		return {
				restrict: 'A',
				template: '<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=desert"></script>',
		}
	}
);