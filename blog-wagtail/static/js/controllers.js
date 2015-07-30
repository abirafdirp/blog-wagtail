var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('blogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.blogposts = BlogIndex.getPosts.query();
    console.log($scope.blogposts);
    for(i in BlogIndex.getPosts.query()){
      console.log(i);
    }
  }
]);
