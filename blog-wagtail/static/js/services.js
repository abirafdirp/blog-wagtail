var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogIndex', ['$resource',
  function($resource) {
    return {
      posts : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,date,main_image,categories,intro,content,related_post,thumbnail_image ', {}, {
        query: {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file&tags=index', {}, {
        query: {method: 'GET', isArray: false}
      }),
      featured_posts : $resource('/api/v1/pages/?type=blog.BlogIndexPage&fields=featured_posts', {}, {
        query: {method: 'GET', isArray: false}
      })
    }
  }
]);
blogServices.factory('Post', ['$resource',
  function($resource) {
    return {
      post : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,angular_url,title_extended,author,date,main_image,intro,main_background_image,content,related_post,categories', {angular_url:'@postTitle'}, {
        query : {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file,title&tags=post', {}, {
        query: {method: 'GET', isArray: false}
      }),
    }
  }
]);