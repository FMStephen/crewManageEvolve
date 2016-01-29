angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('dprt.add', {
        url: '/add',
        templateUrl: 'templates/department/department-add.html',
        controller($scope, $state, dprtall) {

          moreMenu()

          $scope.add = function () {

            $scope.flag = true

            dprtall.add({
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
