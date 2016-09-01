angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MovieCtrl', function($scope, Movies, $ionicLoading, $ionicPopup, StorageService) {
        
     var confirmPopup = $ionicPopup.confirm({
       title: 'Recharger',
       template: 'Souhaitez-vous mettre à jour la programmation?'
     });
        
     confirmPopup.then(function(res) {
         /*Si on clique Ok*/
         if(res){
             $ionicLoading.show();
             /*Charger depuis le site kinepolis*/
             Movies.all().then(function (data) {
                StorageService.clearAll();
                StorageService.add(data); 
                $scope.movies = StorageService.getAll()[0];
                $ionicLoading.hide();
                
                console.log($scope.movies);
             });
         /*Si on clique Cancel*/
         }else{
             /*Charger depuis le local storage*/
             $scope.movies = StorageService.getAll()[0];
             console.log($scope.movies);
             $ionicLoading.hide();
         }
         
     });   
   
    
   $scope.date = new Date().getTime();
    
    
})

.controller('MovieDetailCtrl', function($scope, $stateParams, Movies, $ionicLoading, $ionicPopup) {

/*  console.log($stateParams.movieId);*/
    
/*$ionicLoading.show();
  Movies.get($stateParams.movieId).then(function (datas) {
      $scope.movie = datas;
      $ionicLoading.hide();
  });*/
   $scope.movie = Movies.get($stateParams.movieId) ;
    
  var genresArray = [{
    id: 616,
    name: 'Action'
  }, {
    id: 617,
    name: 'Comédie'
  }, {
    id: 619,
    name: 'Animation'
  }, {
    id: 627,
    name: 'Science-fiction'
  }, {
    id: 628,
    name: 'Thriller'
  }, {
    id: 629,
    name: 'Horreur'
  }, {
    id: 634,
    name: 'Famille'
  }, {
    id: 635,
    name: 'Drame'
  }, {
    id: 637,
    name: 'Fantastique'
  }, {
    id: 675,
    name: 'Aventure'
  }, {
    id: 887,
    name: 'Horreur/Thriller'
  }];
    

    $scope.getGenre = function(genreId){
      for (var i = 0; i < genresArray.length; i++) {
        if (genresArray[i].id === parseInt(genreId)) {
            /*console.log(genresArray[i]);*/
          return genresArray[i].name;
        }
      }
      return "Autre";   
    }
    
  $scope.date = new Date().getTime();
    
    
    $scope.showPopup = function() {
        $scope.myTheater = 'KLOM';
        $scope.threeDim = '52';
        $scope.twoDim = '660';
        $scope.laser = '886';
        $scope.laserThreeDim = '884';
        $scope.vf = '599';
        $scope.vo = '618_378';
        
        var myPopup = $ionicPopup.show({
          template: '<ion-input>'
            + '<div class="col" ng-if="programmation.theater == myTheater" ng-repeat="programmation in movie.data.programmation">'
            + '<div class="button-bar">'
            + '<ion-label class="button button-small button-assertive" style="display: block;margin-left: auto;margin-right: auto;">{{programmation.time}}</ion-label>'
            + '<ion-label ng-if="programmation.version == vf && programmation.format == threeDim" class="button button-small button-dark" style="display: block;margin-left: auto;margin-right: auto;">VF 3D</ion-label>'
            + '<ion-label ng-if="programmation.version == vf && programmation.format == twoDim" class="button button-small button-dark" style="display: block;margin-left: auto;margin-right: auto;">VF 2D</ion-label>'
            + '<ion-label ng-if="programmation.version == vo" class="button button-small button-dark" style="display: block;margin-left: auto;margin-right: auto;">VOSTFR 2D</ion-label>'
            + '<ion-label ng-if="programmation.format == laser" class="button button-small button-dark" style="display: block;margin-left: auto;margin-right: auto;">VF Laser Ultra</ion-label>'
            + '<ion-label ng-if="programmation.format == laserThreeDim" class="button button-small button-dark" style="display: block;margin-left: auto;margin-right: auto;">VF Laser 3D</ion-label>'
            + '</div>'
            + '</div></ion-input>',
          title: 'Horaire du jour - Kinépolis Lomme',
          scope: $scope,
          buttons: [
            { text: 'Ok' }
          ]
        });
        
        myPopup.then(function(res) {
            /*console.log('Saisi!', res);*/
        });

   };
    
    
    $scope.openurl = function(url){
        window.open(url, '_blank','heigth=600,width=600');   // may alse try $window
    } 

    
})

.controller('ReductionsCtrl', function($scope, $cordovaSms) {
$scope.cineday = 1;    
    
 $scope.demanderCineday = function(){   
    document.addEventListener("deviceready", function () {
        console.log("On entre dans addEventListener");
        $cordovaSms
          .send('20000', 'CINE', options)
          .then(function() {
            // Success! SMS was sent
            alert("SMS envoyé!");
            $scope.cineday = 0;  
          }, function(error) {
            // An error occurred
            alert("Erreur lors de l'envoi du sms : " + error);
          });
    });
};
 
     
});
