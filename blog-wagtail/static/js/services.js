var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogIndex', ['$resource',
  function($resource) {
    var imageID;

    return {
      getPosts : $resource('/api/v1/pages/?type=blog.BlogPostPage&fields=title,date,main_image', {}, {
        query: {method: 'GET', isArray: false}
      }),
      getImage : $resource('/api/v1/images/'+imageID, {}, {
        query: {method: 'GET', isArray: false}
      }),
      setImageID : function(ID) {
        imageID = ID;
      }
    }
  }
]);