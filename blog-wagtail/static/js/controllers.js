var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('NavCtrl', ['$scope', '$route',
  function($scope, $route){
    $scope.$route = $route;
  }
]);

blogControllers.controller('BlogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.images = BlogIndex.images.query();
    $scope.posts = BlogIndex.posts.query();
    // for loop is the fastest among filter and for each
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    }
    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    }
  }
]);

blogControllers.controller('PostCtrl', ['$scope', '$route', '$routeParams', 'Post',
  function($scope, $route, $routeParams, Post){
    $scope.titleIt = function (title) {
      var str = title.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      return str.replace('-',' 'g);
    }
    $scope.$route = $route
    $scope.params = $routeParams;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.title = $scope.titleIt($scope.params.postTitle);
      $scope.post = Post.post.query({postTitle:$scope.title});
    }); 
  }
]);
