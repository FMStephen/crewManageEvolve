angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/user/info')
      .when('/user', '/user/info')
      .when('/list', '/list/all/&&/1')
      .when('/dprt', '/dprt/all')

    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        templateUrl: 'templates/navi/navi-user.html'
      })
      .state('list', {
        url: '/list',
        abstract: true,
        templateUrl: 'templates/navi/navi-list.html'
      })
      .state('dprt', {
        url: '/dprt',
        abstract: true,
        templateUrl: 'templates/navi/navi-dprt.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller($scope, $cookies, userService) {
          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.splice(0, 1)
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.update = async function () {
            $scope.flag = true

            var user = {
              studentNo: $scope.studentNo,
              password: $scope.password,
            }

            const response = await userService.login(user)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code) || response.data.code == 201) {
              location.href = '#/user'
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
            $scope.flag = false
          }
        }
      })
  })
