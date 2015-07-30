var blogApp = angular.module('blog', [
  'blogControllers',
  'blogServices'
]);

blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
