angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('dprt.add', {
        url: '/add',
        templateUrl: 'templates/department/department-add.html',
        controller($scope, userService, dprtall) {
          if (userService.logincheck() == null) {
            location.href = '#/login'
          }

          moreMenu()
          $scope.add = async function () {
            $scope.flag = true

            var editmsg = {
              dprtname: $scope.dprtname,
              dprtnote: $scope.dprtnote,
            }

            const response = await dprtall.add(editmsg);

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alert('success')
              location.href = '#/dprt/all'
            }

            $scope.flag = true
          }
        }
      })
  })
