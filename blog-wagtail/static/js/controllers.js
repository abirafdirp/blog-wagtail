var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('blogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.images = BlogIndex.images.query();
    $scope.posts = BlogIndex.posts.query();
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    }
  }
]);
