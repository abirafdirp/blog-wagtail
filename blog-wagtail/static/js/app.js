var blogpostApp = angular.module('blogpost', [
  'blogpostControllers'
]);

blogpostApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});