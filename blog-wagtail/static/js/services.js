var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogIndex', ['$resource',
  function($resource) {
    return {
      posts : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,date,main_image', {}, {
        query: {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file&tags=index', {}, {
        query: {method: 'GET', isArray: false}
      })
    }
  }
]);
blogServices.factory('Post', ['$resource',
  function($resource) {
    return {
      post : $resource('api/v1/pages/?title=:postTitle&fields=main_image,content', {postTitle:'@postTitle'}, {
        query : {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file&tags=blog', {}, {
        query: {method: 'GET', isArray: false}
      })
    }
  }
]);