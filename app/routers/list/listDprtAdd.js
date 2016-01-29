angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.add', {
        url: '/add',
        templateUrl: 'templates/list/list-add.html',
        controller($scope, listdprt, userService) {

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

          $scope.position = '干事'

          function showuncompleted () {

            return listdprt.addshow()

              .then(({ data }) => {
                $scope.uncompleteds = data.uncompleteds
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })
          }

          showuncompleted()

          $scope.add = function () {

            var str1 = document.getElementById('studentNo').innerHTML
            var str2 = str1.replace(/\<\/span><span style="-webkit-text-stroke-width: 0.2px;"><br><\/span>\<\/div><div style="-webkit-text-stroke-width: 0.2px;"><span style="-webkit-text-stroke-width: 0.2px;">/g, '.').replace(/\<span style="-webkit-text-stroke-width: 0.2px;"\>/g, '').replace(/\<\/span\>\<br style="-webkit-text-stroke-width: 0.2px;"\>\<div style="-webkit-text-stroke-width: 0.2px;"\>/g, '').replace(/<\/span><\/div>/g, '').replace(/<\/span><div style="-webkit-text-stroke-width: 0.2px;">/g, '').replace(/<div style="-webkit-text-stroke-width: 0.2px;"><br>/g, '').replace(/<div style="-webkit-text-stroke-width: 0.2px;">/g, '').replace(/<br>/g, '').replace(/<\/span>/g, '.').replace(/<\/div>/g, '').replace(/<div>/g, '').replace(/<span>/g, '')

            $scope.flag = true

            listdprt.add({
              studentno: str2,
              position: $scope.position,
            })

              .then(() => {
                alertbox('success', '添加新成员成功，请在部门列表查看')
                setTimeout(() => { $state.go('list.dprt') }, 1500)
              })

              .catch(({ message }) => {
                alertbox('danger', message)
                $scope.studentno = response.data.data.failed.join('\r\n')
                showuncompleted()
              })

              .then(() => {
                $scope.flag = false
              })
          }
        }
      })
  })
