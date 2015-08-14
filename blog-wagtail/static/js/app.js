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
				activetab: 'home',
				title: 'Home',
				controller: 'HomeCtrl'
			}).
	    	when('/blog', {
				templateUrl: '/blog',
				controller: 'BlogIndexCtrl',
				activetab: 'blog',
				title: 'Blog',
				category: 'all'
			}).
			when('/blog?category=:category', {
				templateUrl: '/blog',
				title: 'Blog',
				controller: 'BlogIndexCtrl'
			}).
			when('/blog?author=:author', {
				templateUrl: '/blog',
				title: 'Blog',
				controller: 'BlogIndexCtrl'
			}).
			when('/blog/:postTitle', {
				templateUrl: function (params) {return '/blog/'+params.postTitle},
				controller: 'PostCtrl',
				title: 'Blog',
				activetab: 'blog',
				postTitle: function (params) {return params.postTitle}
			}).
			when('/about', {
				templateUrl: '/about',
				controller: 'AboutCtrl',
				activetab: 'about',
			}).
			when('/portofolio', {
				templateUrl: '/portofolio',
				controller: 'PortofolioCtrl',
				title: 'Portofolio',
				activetab: 'portofolio',
			}).
			otherwise({
				redirectTo: '/home'
			})

	
}]);

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