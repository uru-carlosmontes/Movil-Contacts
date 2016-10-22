// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(["$stateProvider", "$urlRouterProvider",
  function ($stateProvider, $url) {
     
    $url.otherwise("/init");
    
    $stateProvider
      .state("init", {
        "url": "/init",
        "template": "<h1>INIT</h1>",
        "controller": "InitCtrl"
      })
      .state("contacts", {
        "url": "/contacts",
        "templateUrl": "./views/contacts.view.html",
        "controller": "ContactsCtrl"
      });  
  }
])
.controller("InitCtrl", ["$scope", "$state", "$ionicPlatform","$cordovaSQLite", 
  function ($scope, $state, $ionicPlatform, $cordovaSQLite){
    $ionicPlatform.ready(function (){
      $scope.$apply(function (){

        $state.transitionTo("contacts");
      });
    });
  }
])
.controller("ContactsCtrl",["$scope", "$http", "$cordovaContacts", "$ionicPlatform",
  function ($scope, $http, $cordovaContacts, $ionicPlatform){    
      $scope.contacts = [];

      $scope.saveTestContact = function () {
        alert("SAVING");
        $cordovaContacts.save({"displayName": "MAGICOWL TEST", "magicowl": "magicowl002"})
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.error(error);
          })
      }

      $scope.getContacts = function () {
        alert("SEARCHING");
        $cordovaContacts.find({filter: 'MAGICOWL TEST', multiple: true, fields: ['displayName']})
        .then(function (res)  {
          $scope.contacts = res;
        }, function (err) {
          console.log(err);
        });
      }
      // $ionicPlatform.ready(function () {
      //   $scope.$apply(function (){
          
      //   });
      // });    
  }
]);
