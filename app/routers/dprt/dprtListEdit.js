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
              $scope.alerts.splice(0, 1)
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          var request = {id: $stateParams.id}

          dprtall.editshow(request)
            .then(function (response) {
              userService.cookieset(response.data.token)

              if (userService.result(response.data.code)) {
                $scope.content = response.data.data
                $scope.dprtname = $scope.content.dprtname
                $scope.dprtnote = $scope.content.dprtnote
              } else {
                alertbox('danger', userService.hint(response.data.code))
              }
            })

          $scope.edit = async function () {
            $scope.flag = true

            var editmsg = {}

            editmsg.id = request.id
            editmsg.dprtname = $scope.dprtname
            editmsg.dprtnote = $scope.dprtnote

            const response = await dprtall.edit(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '部门资料修改成功')
              setTimeout(function () { location.href = '#/dprt/all' }, 1500)
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }

            $scope.flag = true
          }
        }
      })
  })
