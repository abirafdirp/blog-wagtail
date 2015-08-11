var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('NavCtrl', ['$scope', '$route',
  function($scope, $route){
    $scope.$route = $route;
  }
]);

blogControllers.controller('BlogIndexCtrl', ['$scope', '$route', '$routeParams', 'BlogIndex',
  function($scope, $route, $routeParams, BlogIndex) {
    $scope.posts = BlogIndex.posts.query();
    $scope.images = BlogIndex.images.query();
    $scope.featured_posts = BlogIndex.featured_posts.query();
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.params_category = $scope.params.category;
    $scope.author = $scope.params.author;
    $scope.categories = [];

    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
    
    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    };

    $scope.getCategories = function() {
      categories = [];
      for(var i = 0; i < $scope.posts.pages.length; i++){
        for(var j = 0; j < $scope.posts.pages[i].categories.length; j++){
          if(categories.indexOf($scope.posts.pages[i].categories[j].value) == -1){
            categories.push($scope.posts.pages[i].categories[j].value);
          }
        }
      }
      return categories;
    };

    $scope.filterCategory = function(postID) {
      var index = $scope.posts.pages.map(function(el) {
        return el.id;
      }).indexOf(postID);

      if($scope.params_category == null) {
        return true;
      }

      for(var i = 0; i < $scope.posts.pages[index].categories.length; i++) {
        if($scope.posts.pages[index].categories[i].value == $scope.params_category) {
          return true;
        }
      }
      return false;
    }

  }
]);

blogControllers.controller('PostCtrl', ['$scope', '$route', '$routeParams', 'Post', 'BlogIndex',
  function($scope, $route, $routeParams, Post, BlogIndex){
    $scope.$route = $route
    $scope.params = $routeParams;
    $scope.title = $scope.params.postTitle;
    $scope.posts = BlogIndex.posts.query();

    $scope.post = Post.post.query({angular_url:$scope.title});

    $scope.images = Post.images.query();
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    };
  }
]);

blogControllers.controller('AboutCtrl', ['$scope', 'About',
  function($scope, About) {
    $scope.content = About.about.query();

    $scope.images = About.images.query();
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
  }
]);


