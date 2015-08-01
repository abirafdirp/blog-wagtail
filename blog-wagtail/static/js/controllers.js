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

blogControllers.controller('PostCtrl', ['$scope', 'Post',
  function($scope, Post){
    $scope.post = Post.post.query();
}]);
