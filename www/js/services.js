


//header('Access-Control-Allow-Origin:http://client.runoob.com');

angular.module('starter.services',[])
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '用户1',
    lastText: '卧槽',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: '用户2',
    lastText: '呵呵',
    face: 'img/max.png'
  }];
  return {
    all: function(){
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



  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, $el) {
        $rootScope.hideTabs = true;
        $scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  });




