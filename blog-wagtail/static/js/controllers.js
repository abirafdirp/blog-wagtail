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
    $scope.featured_posts = BlogIndex.featured_posts.query();
    $scope.setPostTitle = function(title){

    }
    // for loop is the fastest among filter and for each
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
    $scope.getFeaturedPost = function(id) {
      for(var i = 0; i < $scope.posts.pages.length; i++){
        if($scope.posts.post[i].id === id){
          return $scope.posts.post[i];
        }
      }
    };
    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    };
  }
]);

blogControllers.controller('PostCtrl', ['$scope', '$route', '$routeParams', 'Post',
  function($scope, $route, $routeParams, Post){
    $scope.$route = $route
    $scope.params = $routeParams;
    $scope.title = $scope.params.postTitle;

    $scope.post = Post.post.query({angular_url:$scope.title});

    $scope.images = Post.images.query();
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
    $scope.formatDate = function (date) {

    }
  }
]);
