angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.reset', {
        url: '/reset/:id',
        templateUrl: 'templates/list/list-resetpw.html',
        controller($scope, $stateParams, listdprt, userService) {

          moreMenu()
          naviSecondery(1)

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

          listdprt.resetshow({ id: $stateParams.id })

            .then(({ data }) => {
              alertbox('', '此操作将修改对象的密码，无法撤销')
              $scope.members = data.members
            })

            .catch(({ code, message }) => {
              if (code == 108) {
                setTimeout(() => { history.back() }, 1500)
              }
              alertbox('danger', message)
            })

          $scope.reset = function () {

            if ($scope.newpw != $scope.cfrmpw) {
              alertbox('danger', '确认密码不一致')
              return;
            }

            if (!window.confirm('确认强制修改密码吗?')) {
              return;
            }

            $scope.flag = true

            listdprt.reset({
              id: idrequest.id,
              pw: $scope.newpw,
              pwcfrm: $scope.cfrmpw,
            })

              .then(() => {
                alertbox('success', '强制修改密码成功')
                setTimeout(function () { $state.go('list.dprt') }, 1500)
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }}
      })
  })
