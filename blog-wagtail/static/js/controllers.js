var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('NavCtrl', ['$scope', '$route','$location', '$mdSidenav',
  function($scope, $route, $location, $mdSidenav){
    $scope.$route = $route;
    $scope.changeUrl = function(url) {
      if (url){
        $location.path(url);
      }
    };
    $scope.toggleLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $scope.closeLeftMenu = function() {
      $mdSidenav('left').close();
    };
  }
]);

blogControllers.controller('HomeCtrl', ['$scope',
  function($scope){
  }
]);

blogControllers.controller('PortofolioCtrl', ['$scope', 'Portofolio',
  function($scope, Portofolio){
    $scope.show_loading = true;
    $scope.items = Portofolio.portofolio.query();

    $scope.all_images = [];
    $scope.images = Portofolio.images.query(function() {
      for(var i = 0; i < $scope.images.images.length; i++){
        $scope.images.images[i].file = $scope.images.images[i].file.replace('http','https');
        $scope.all_images.push($scope.images.images[i])
      }
      $scope.show_loading = false;
    });
  }
]);

blogControllers.controller('BlogIndexCtrl', ['$scope', '$route', '$routeParams', 'BlogIndex', '$filter', '$timeout',
  function($scope, $route, $routeParams, BlogIndex, $filter, $timeout) {
    $scope.show_loading = true;
    $scope.params = $routeParams;
    $scope.params_category = $scope.params.category;
    $scope.categories = [];
    $scope.posts = BlogIndex.posts.query(function() {
      for(var i = 0; i < $scope.posts.pages.length; i++){
        for(var j = 0; j < $scope.posts.pages[i].categories.length; j++){
          if($scope.categories.indexOf($scope.posts.pages[i].categories[j].value) == -1){
            $scope.categories.push($scope.posts.pages[i].categories[j].value);
          }
        }
      }
      $scope.show_loading = false;
    });
    $scope.images = BlogIndex.images.query();
    $scope.$route = $route;
    $scope.author = $scope.params.author;

    //$scope.$watch($scope.params_category, function(){
    //  $timeout(function(){
    //    if ($scope.params_category){
    //      console.log($scope.posts);
    //      $scope.posts = $filter('filter')($scope.posts.pages, $scope.params_category);
    //    }
    //  }, 0);
    //});


    $scope.all_images = [];
    $scope.images = BlogIndex.images.query(function() {
      for(var i = 0; i < $scope.images.images.length; i++){
        $scope.images.images[i].file = $scope.images.images[i].file.replace('http','https');
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
    if ($scope.params_category){
      $scope.postLimit = 99;
    }
    else {
      $scope.postLimit = 0;
    }
    $scope.loadMore = function() {
      $scope.postLimit += 6;
    }

  }
]);

blogControllers.controller('PostCtrl', ['$scope', '$route', '$routeParams', 'Post', 'BlogIndex', 'angularLoad',
  function($scope, $route, $routeParams, Post, BlogIndex, angularLoad){
    $scope.show_loading = true;
    $scope.$route = $route;
    $scope.params = $routeParams;
    $scope.title = $scope.params.postTitle;
    $scope.posts = BlogIndex.posts_minimal.query();

    $scope.all_images = [];
    $scope.images = Post.images.query(function() {
      for(var i = 0; i < $scope.images.images.length; i++){
        $scope.images.images[i].file = $scope.images.images[i].file.replace('http','https');
        $scope.all_images.push($scope.images.images[i]);
      }
      $scope.show_loading = false;
    });

    $scope.slugify = function(url) {
      return url
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
    };


    $scope.$on('$viewContentLoaded', function() {
    });

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
