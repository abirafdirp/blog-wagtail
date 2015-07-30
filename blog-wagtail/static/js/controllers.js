var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('blogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.imageID = 0;
    $scope.blogposts = BlogIndex.posts.query();
    $scope.setImageID = function(ID) {
      $scope.imageID = ID;
      console.log($scope.imageID);
    }
    $scope.$watch('imageID', function() {
      $scope.image = BlogIndex.image.query({id: $scope.imageID})
    });
  }
]);
