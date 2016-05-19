angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.detail', {
        url: '/detail/:id',
        templateUrl: 'templates/list/list-detail.html',
        controller($scope, $stateParams, listall, listdprt, userService) {

          moreMenu()
          naviSecondery(0)

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

          $scope.positionopt = superposition

          function showdetail () {

            listall.detail($stateParams)

              .then(({ data }) => {
                $scope.content = data.content
                $scope.editor = data.editor
                $scope.position = $scope.content.position
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })
          }

          showdetail()

          $scope.isEdit = function (value) {
            if (value) {
              return true
            } else {
              return false
            }
          }

          $scope.changeposition = function () {
            $scope.flag = true

            var editmsg = {
              id: $stateParams.id,
              position: $scope.position,
            }

            listdprt.position(editmsg)

              .then(() => {
                alertbox('success', '修改职位成功')
                showdetail()
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
