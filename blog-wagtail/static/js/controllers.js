var blogpostControllers = angular.module('blogpostControllers', []);

blogpostControllers.controller('blogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.blogposts = BlogIndex.getPosts.query();
    $scope.images = [];
    for (image in $scope.blogposts) {
      BlogIndex.setImageID(image.id);
      $scope.images.push(BlogIndex.getImage.query());
    }
  }
]);
