var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogIndex', ['$resource',
  function($resource) {
    return {
      posts : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,date,main_image', {}, {
        query: {method: 'GET', isArray: false}
      }),
      image : $resource('/api/v1/images/:id/?fields=file', {id:'@id'}, {
        query: {method: 'GET', isArray: false}
      })
    }
  }
]);