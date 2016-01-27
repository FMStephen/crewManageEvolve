angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('dprt.edit', {
        url: '/edit/:id',
        templateUrl: 'templates/department/department-edit.html',
        controller($scope, $stateParams, userService, dprtall) {

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

          const id = $stateParams.id

          dprtall.editshow({ id })

            .then(function ({ data }) {
              $scope.content = data
              $scope.dprtname = $scope.content.dprtname
              $scope.dprtnote = $scope.content.dprtnote
            })

            .catch(({ message }) => {
              alertbox('danger', message)
            })

          $scope.edit = function () {

            $scope.flag = true

            dprtall.edit({
              id,
              dprtname: $scope.dprtname,
              dprtnote: $scope.dprtnote,
            })

              .then(() => {
                alertbox('success', '部门资料修改成功')
                setTimeout(() => { $state.go('dprt.all') }, 1500)
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
