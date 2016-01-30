angular.module('app')

  .config(($stateProvider, $urlRouterProvider) => {

    function authenticate ($timeout, $state, authService) {
      if (!authService.token) {
        $timeout(() => $state.go('login'))
        return Promise.reject()
      }
    }

    $urlRouterProvider.when('', '/user/info')
      .when('/user', '/user/info')
      .when('/list', '/list/all/&&/1')
      .when('/dprt', '/dprt/all')

    $stateProvider

      .state('user', {
        abstract: true,
        url: '/user',
        templateUrl: 'templates/navi/navi-user.html',
        resolve: { authenticate }
      })
      .state('list', {
        url: '/list',
        abstract: true,
        templateUrl: 'templates/navi/navi-list.html',
        resolve: { authenticate }
      })
      .state('dprt', {
        url: '/dprt',
        abstract: true,
        templateUrl: 'templates/navi/navi-dprt.html',
        resolve: { authenticate }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        resolve: {
          check($timeout, $state, authService) {
            if (authService.token) {
              $timeout(() => $state.go('user.info'))
              return Promise.reject()
            }
          }
        },
        controller($scope, $state, $cookies, userService) {

          $scope.secretLeft = 'img/TZ.png'
          $scope.secretRight = 'img/TM.png'

          $scope.secretHide = function() {

            $scope.secretLeft = 'img/TZ.png'
            $scope.secretRight = 'img/TM.png'

          }

          $scope.secretShow = function() {

            $scope.secretLeft = 'img/TZH.png'
            $scope.secretRight = 'img/TMH.png'

          }


          $scope.alerts = []
          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.update = function () {

            $scope.flag = true
            userService.login($scope)

              .then(() => {
                $state.go('user.info')
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }
        }
      })
  })
