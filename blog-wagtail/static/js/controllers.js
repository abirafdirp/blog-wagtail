var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('NavCtrl', ['$scope', '$route',
  function($scope, $route){
    $scope.$route = $route;
  }
]);

blogControllers.controller('HomeCtrl', ['$scope',
  function($scope){
    angular.element(document).ready(function () {
        $(".parallax").parallax();
    });
  }
]);

blogControllers.controller('PortofolioCtrl', ['$scope', 'Portofolio',
  function($scope, Portofolio){
    $scope.items = Portofolio.portofolio.query();
    $scope.images = Portofolio.images.query();
    $scope.getImage = function(id) {
      for(var i = 0; i < $scope.images.images.length; i++){
        if($scope.images.images[i].id === id){
          return $scope.images.images[i].file;
        }
      }
    };
  }
]);

blogControllers.controller('BlogIndexCtrl', ['$scope', '$route', '$routeParams', 'BlogIndex',
  function($scope, $route, $routeParams, BlogIndex) {
    $scope.categories = [];
    $scope.posts = BlogIndex.posts.query(function() {
      for(var i = 0; i < $scope.posts.pages.length; i++){
        for(var j = 0; j < $scope.posts.pages[i].categories.length; j++){
          if($scope.categories.indexOf($scope.posts.pages[i].categories[j].value) == -1){
            $scope.categories.push($scope.posts.pages[i].categories[j].value);
          }
        }
      }
    });
    $scope.images = BlogIndex.images.query();
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.params_category = $scope.params.category;
    $scope.author = $scope.params.author;


    $scope.all_images = [];
    $scope.images = BlogIndex.images.query(function() {
      for(var i = 0; i < $scope.images.images.length; i++){
        $scope.all_images.push($scope.images.images[i])
      }
    });
    
    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    };

    $scope.filterCategory = function(postID) {
      if($scope.params_category == null) {
        return true;
      }
      var index = $scope.posts.pages.map(function(el) {
        return el.id;
      }).indexOf(postID);

      for(var i = 0; i < $scope.posts.pages[index].categories.length; i++) {
        if($scope.posts.pages[index].categories[i].value == $scope.params_category) {
          return true;
        }
      }
      return false;
    };

    $scope.postLimit = 0;
    $scope.loadMore = function() {
      $scope.postLimit += 5;
    }

  }
]);

blogControllers.controller('PostCtrl', ['$scope', '$route', '$routeParams', 'Post', 'BlogIndex',
  function($scope, $route, $routeParams, Post, BlogIndex){
    $scope.$route = $route
    $scope.params = $routeParams;
    $scope.title = $scope.params.postTitle;
    $scope.posts = BlogIndex.posts_minimal.query();

    $scope.post = Post.post.query({angular_url:$scope.title});

    $scope.all_images = [];
    $scope.images = Post.images.query(function() {
      for(var i = 0; i < $scope.images.images.length; i++){
        $scope.images.images[i].file = $scope.images.images[i].file.replace('http','https');
        $scope.all_images.push($scope.images.images[i]);
      }
    });

    $scope.slugify = function(url) {
        return url
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    };

    angular.element(document).ready(function () {
    });
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


