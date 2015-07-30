var blogpostControllers = angular.module('blogpostControllers', []);

blogpostControllers.controller('imageCtrl', ['$scope',
  function($scope) {
    $scope.index = -100;
    $scope.indexIt = function() {
      $scope.index = $scope.index + 1;
    };
  }
]);
