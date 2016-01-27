angular.module('app')
  .config(($stateProvider, $urlRouterProvider) => {

    function authenticate ($timeout, $state, userService) {
      if (!userService.logincheck()) {
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
          check($timeout, $state, userService) {
            if (userService.logincheck()) {
              $timeout(() => $state.go('/user/info'))
              return Promise.reject()
            }
          }
        },
        controller($scope, $state, $cookies, userService) {

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.update = async function () {
            $scope.flag = true

            userService.login($scope)
              .then(response => {

                userService.cookieset(response.data.token)
                if (userService.result(response.data.code) || response.data.code == 201) {
                  $state.go('user')
                } else {
                  alertbox('danger', userService.hint(response.data.code))
                }
                $scope.flag = false
              })
              .catch(error => {
                alertbox('danger', '未知错误')
              })
          }
        }
      })
  })
