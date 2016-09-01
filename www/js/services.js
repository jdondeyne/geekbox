angular.module('starter.services', ['ui.router'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Guillaume Villain',
    lastText: 'On mange ou?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Mickaël Honvault',
    lastText: 'Je suis pas là.',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adrien Heyman',
    lastText: 'Le réalisateur est pourri.',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Arnaud Vandomme',
    lastText: 'Je viens en moto.',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Jeremy Logier',
    lastText: 'On vous rejoins après.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Movies', function($q, StorageService, $ionicLoading) {
  // Might use a resource here that returns a JSON array
    
    var movies;
    var jsonArray;
    var json;
    
    function getAjax(getMovies){

        $.ajax({
          url: 'http://whateverorigin.org/get?url=' + encodeURIComponent('https://kinepolis.fr/aujourdhui') + '&callback=?',
          dataType: 'json',
          async: false,
          success: function(data) {
/*                  var myRegex = /"kinepolis_movie_filter":(.*),"kinepolis_external_banners":/;
                  jsonArray = myRegex.exec(data.contents);  

                  json = jsonArray[1];

                  var obj = JSON.parse(json);

                  movies = obj.list;
                  console.log(movies);*/
            
                  getMovies(data);
          }
        });

    }
    
        
  return {
    all: function() {
        // Create a deferred object
        var deferred = $q.defer();

        // and depending on the results,
        // call deferred.resolve(data) or deferred.reject(error)
        getAjax(function(data){
          var myRegex = /"kinepolis_movie_filter":(.*),"kinepolis_external_banners":/;
          jsonArray = myRegex.exec(data.contents);  

          json = jsonArray[1];

          var obj = JSON.parse(json);

          movies = obj.list;

          /*console.log(movies);*/

          deferred.resolve(movies) ;
        });
        
        // Return the promise object
        return deferred.promise;
        
    },
    get: function(movieId) {
        var movies = StorageService.getAll()[0];
        return movies[movieId];
        
    }
  };
})

.factory ('StorageService', function ($localStorage) {
    
    $localStorage = $localStorage.$default({
        things: []
    });

    var _getAll = function () {

        return $localStorage.things;
    };

    var _add = function (thing) {
      $localStorage.things.push(thing);
    }

    var _remove = function (thing) {
      $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
    }
    
    var _clearAll = function () {
      $localStorage.things.splice($localStorage.things);
    }   

    return {
        getAll: _getAll,
        add: _add,
        remove: _remove,
        clearAll: _clearAll
    };
});
