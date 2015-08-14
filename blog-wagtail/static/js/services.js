var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogIndex', ['$resource',
  function($resource) {
    return {
      posts : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,date,categories,intro,content,thumbnail_image,author', {}, {
        query: {method: 'GET', isArray: false}
      }),
      posts_minimal : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title', {}, {
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
      post : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,angular_url,title_extended,author,date,main_image,intro,main_background_image,content,related_post,categories,main_img_disc', {angular_url:'@postTitle'}, {
        query : {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file,title&tags=post', {}, {
        query: {method: 'GET', isArray: false}
      }),
    }
  }
]);
blogServices.factory('About', ['$resource',
  function($resource) {
    return {
      about : $resource('/api/v1/pages/?type=about.AboutPage&fields=content,picture', {}, {
        query : {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file,title&tags=about', {}, {
        query: {method: 'GET', isArray: false}
      }),
    }
  }
])
blogServices.factory('Portofolio', ['$resource',
  function($resource) {
    return {
      portofolio : $resource('/api/v1/pages/?type=portofolio.PortofolioPage&fields=item', {}, {
        query : {method: 'GET', isArray: false}
      }),
      images : $resource('/api/v1/images/?fields=file,title&tags=portofolio', {}, {
        query: {method: 'GET', isArray: false}
      }),
    }
  }
])