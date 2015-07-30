var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices'
]);

blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

blogApp.controller('imageIndsafexCtrl', [
  '$scope', '$http', function($scope, $http) {
    $scope.posts = [];
    return $http.get('/api/posts').then(function(result) {
      return angular.forEach(result.data, function(item) {
        return $scope.posts.push(item);
      });
    });
  }
]);