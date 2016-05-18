angular.module('starter.controllers')
  .directive('hideTabs',function($rootScope){



    console.log('执行');
    return {

      restrict:'AE',

      link:function($scope){

        $rootScope.hideTabs = 'tabs-item-hide';

        $scope.$on('$destroy',function(){

          $rootScope.hideTabs = ' ';

        })

      }

    }

  });
