var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices',
  'ngRoute',
	'ngDisqus',
  'ngSanitize',
	'duScroll'
]);

blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

blogApp.config(function($disqusProvider) {
    $disqusProvider.setShortname('pythonified');
});

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
				activetab: 'blog',
				category: 'all'
			}).
			when('/blog?category=:category', {
				templateUrl: '/blog',
				controller: 'BlogIndexCtrl',
				category: 'notAll'
			}).
			when('/blog?author=:author', {
				templateUrl: '/blog',
				controller: 'BlogIndexCtrl'
			}).
			when('/blog/:postTitle', {
				templateUrl: function (params) {return '/blog/'+params.postTitle},
				controller: 'PostCtrl',
				activetab: 'blog'
			}).
			otherwise({
				redirectTo: '/home'
			})

	
}]);