angular.module('app')
  .config($stateProvider => {
    $stateProvider
      .state('list.reset', {
        url: '/reset/:id',
        templateUrl: 'templates/list/list-resetpw.html',
        controller($scope, $stateParams, listdprt, userService) {
          if (userService.logincheck() == null) {
            location.href = '#/login'
          }

          moreMenu()
          naviSecondery(1)

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

          var idrequest = {}
          idrequest.id = $stateParams.id

          listdprt.resetshow(idrequest)
            .then(function (response) {
              userService.cookieset(response.data.token)

              if (userService.result(response.data.code)) {
                
                alertbox('', '此操作将修改对象的密码，无法撤销')
                $scope.members = response.data.data.members

              } else {
                if (response.data.code == 108) {
                  setTimeout(function () { history.back(); }, 1500)
                }
                alertbox('danger', userService.hint(response.data.code))
              }
            })

          $scope.reset = async function () {
            if ($scope.newpw != $scope.cfrmpw) {
              alertbox('danger', '确认密码不一致')
              return;
            }
            if (!window.confirm('确认强制修改密码吗?')) {
              return;
            }
            $scope.flag = true

            var editmsg = {
              id: idrequest.id,
              pw: $scope.newpw,
              pwcfrm: $scope.cfrmpw,
            }

            const response = await listdprt.reset(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '强制修改密码成功')
              setTimeout(function () { location.href = '#/list/dprt'; }, 1500)
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }

            $scope.flag = false
          }}
      })
  })
