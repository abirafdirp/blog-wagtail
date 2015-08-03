var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices',
  'ngRoute',
	'ngDisqus',
  'ngSanitize',
]);

blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

blogApp.config(function($disqusProvider) {
    $disqusProvider.setShortname('pythonified');
});

blogApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

blogApp.config(['$routeProvider', '$httpProvider', 
	function($routeProvider, $httpProvider) {
	    $routeProvider.
	    	when('/home', {
				templateUrl: '/home-page',
				activetab: 'home'
			}).
	    	when('/blog', {
				templateUrl: '/blog',
				controller: 'BlogIndexCtrl',
				activetab: 'blog'
			}).
			when('/blog/:postTitle', {
				templateUrl: function (params) {return '/blog/'+params.postTitle},
				controller: 'PostCtrl',
				activetab: 'blog',
				postTitle: function (params) {return params.postTitle}	
			}).
			otherwise({
				redirectTo: '/home'
			})

	
}]);