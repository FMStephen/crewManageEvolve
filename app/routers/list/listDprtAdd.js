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
              $scope.alerts.splice(0, 1)
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.position = '干事'

          async function showuncompleted () {
            const response = await listdprt.addshow()

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              $scope.uncompleteds = response.data.data.uncompleteds
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
          }

          showuncompleted()

          $scope.add = async function () {
            var str1 = document.getElementById('studentNo').innerHTML
            var str2 = str1.replace(/\<\/span><span style="-webkit-text-stroke-width: 0.2px;"><br><\/span>\<\/div><div style="-webkit-text-stroke-width: 0.2px;"><span style="-webkit-text-stroke-width: 0.2px;">/g, '.').replace(/\<span style="-webkit-text-stroke-width: 0.2px;"\>/g, '').replace(/\<\/span\>\<br style="-webkit-text-stroke-width: 0.2px;"\>\<div style="-webkit-text-stroke-width: 0.2px;"\>/g, '').replace(/<\/span><\/div>/g, '').replace(/<\/span><div style="-webkit-text-stroke-width: 0.2px;">/g, '').replace(/<div style="-webkit-text-stroke-width: 0.2px;"><br>/g, '').replace(/<div style="-webkit-text-stroke-width: 0.2px;">/g, '').replace(/<br>/g, '').replace(/<\/span>/g, '.').replace(/<\/div>/g, '').replace(/<div>/g, '').replace(/<span>/g, '')

            // console.log(str2)

            $scope.flag = true

            var editmsg = {}

            editmsg.studentno = str2
            editmsg.position = $scope.position

            $scope.flag = false

            const response = await listdprt.add(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '添加新成员成功，请在部门列表查看')
              setTimeout(function () { location.href = '#/list/dprt'; }, 1500)
              $scope.flag = false
              return;
            }

            alertbox('danger', userService.hint(response.data.code))

            function failedno () {
              var sn = ''
              for (x = 0;x < response.data.data.failed.length;x++) {
                sn += response.data.data.failed[x] + '\r'
              }
              return sn
            }

            $scope.studentno = failedno()
            showuncompleted()
            $scope.flag = false
          }
        }
      })
  })
