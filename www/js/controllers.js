angular.module('starter.controllers', [])
  /*
   DashCtrl
   */
  .controller('DashCtrl', function ($scope, $ionicModal, $ionicListDelegate, $http, ApiEndpoint, $ionicLoading) {
    var isAdd = true;
    $ionicModal.fromTemplateUrl('templates/dash-modal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });


    //获取用户信息.
    $scope.contacts = [];
    $http.post(ApiEndpoint.url + 'getuserinfo').success(function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var datas = response[i];
        $scope.contacts.push(datas);
      }
    });

    //点击弹出添加用户信息的框
    $scope.login = function () {
      isAdd = true;
      $scope.newUser = {};
      $scope.modal.show();
    };
    //编辑
    $scope.edit = function (sender) {
      isAdd = false;
      $ionicListDelegate.closeOptionButtons();
      $scope.newUser = sender;
      $scope.modal.show();
      $scope.contacts = $scope.contacts;
    }
    $scope.createContact = function (u) {
      $ionicLoading.show({
        template: '加载中...'
      });
      //创建新的用户信息.
      if (isAdd == true) {
        //post请求.
        $http.post(ApiEndpoint.url + "adduserinfo",
          {
            firstName: u.firstName,
            lastName: u.lastName,
            phone: u.phone,
            gender: "1",
          })
          .success(function (response) {
            $http.post(ApiEndpoint.url + 'getuserinfo').success(function (response) {
              //console.log(response);
              $scope.contacts.length = 0;
              for (var i = 0; i < response.length; i++) {
                var datas = response[i];
                $scope.contacts.push(datas);
              }
            });
            console.log($scope.contacts);
            $ionicLoading.hide();
            $scope.modal.hide();
          });
      }
      //修改用户信息.
      else {
        $http.post(ApiEndpoint.url + "updatetheuserinfo",
          {
            firstName: u.firstName,
            lastName: u.lastName,
            phone: u.phone,
            gender: "1",
            id: u.id,
            face: u.face,
          })
          .success(function (response) {
            $scope.modal.hide();
            $ionicLoading.hide();
          });
      }
    };
    //下拉刷新.
    $scope.doRefresh = function () {
      $http.post(ApiEndpoint.url + 'getuserinfo').success(function (response) {
        $scope.contacts = response;

      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
    //删除
    $scope.remove = function (sender) {
      console.log(sender.id);
      //post请求.
      $http.post(ApiEndpoint.url + "deleteuserinfo",
        {
          id: sender.id
        })
        .success(function (response) {
          console.log(response);
          if (response.result == 1) {
            var data = $scope.contacts;
            {
            }
            $scope.contacts.splice(data.indexOf(sender), 1);
            $ionicListDelegate.closeOptionButtons();
          }
        });
    };
  })


  .controller('ChatsCtrl', function ($scope, $cordovaImagePicker) {


    //点击
    //$scope.addpickImage = function(){
    //
    //  console.log('恶趣味全文');
    //
    //
    //};


    $scope.addpickImage = function () {
      console.log('addpickImage');
      var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 80
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        }, function (error) {
          // error getting photos
        })
    };





  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  //还需要在这里绑定数据.
  .controller('dashDetailCtrl', function ($scope, $stateParams, $http, ApiEndpoint) {
    //console.log($stateParams.contactId);

    //hideTabs()
    var userid = $stateParams.contactId;
    $scope.detailmodel = [];
    $http.post(ApiEndpoint.url + "getuserdetailedinfo",
      {
        id: userid
      })
      .success(function (response) {


        console.log(response);


        $scope.detailmodel = response;
      });

  })


  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
