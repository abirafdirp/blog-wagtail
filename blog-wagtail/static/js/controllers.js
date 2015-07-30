var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('blogIndexCtrl', ['$scope', 'BlogIndex',
  function($scope, BlogIndex) {
    $scope.blogposts = BlogIndex.posts.query();
    $scope.setImageID = function(ID) {
    	$scope.imageID = ID;
    }
    $scope.getImage = function() {
    	$scope.image = BlogIndex.image.query({id:$scope.imageID});
    }
    
  }
]);
