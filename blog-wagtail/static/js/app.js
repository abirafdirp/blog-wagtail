var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices',
  'ngRoute'
]);

blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

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
				activetab: 'blog-index'
			}).
			when('/blog/:postTitle', {
				templateUrl: function (params) {return '/blog/'+params.postTitle},
				controller: 'PostCtrl',
				activetab: 'post'
			}).
		    otherwise({
		      redirectTo: '/home'
		    })

	
}])