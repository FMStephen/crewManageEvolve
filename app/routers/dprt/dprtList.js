angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('dprt.all', {
        url: '/all',
        templateUrl: 'templates/department/department-all.html',
        controller($scope, userService, dprtall) {

          moreMenu()
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

          dprtall.show()

            .then(({ data }) => {
              $scope.dprts = data.dprt
              $scope.editor = data.editor
            })

            .catch(({ message }) => {
              alertbox('danger', message)
            })

          $scope.radio = {}

          $scope.edit = function () {
            if ($scope.radio.dprt != null) {
              $state.go('dprt.edit', { id: $scope.radio.dprt })
            } else {
              alertbox('danger', '请选择操作对象')
            }
          }

          $scope.isEdit = function (value) {
            return !!value
          }
        }
      })
  })
