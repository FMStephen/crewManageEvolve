angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.dprt', {
        url: '/dprt',
        templateUrl: 'templates/list/list-department.html',
        controller($scope, listdprt, userService) {

          optionMenu()
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

          $scope.content = {}

          async function showdprt () {
            const response = await listdprt.show()

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              $scope.members = response.data.data.members
              $scope.editor = response.data.data.editor
            }
          }

          showdprt()

          $scope.isEdit = function (value) {
            if (value) {
              return true
            } else {
              return false
            }
          }

          $scope.checkbox = []
          $scope.rcl = '退休'
          $scope.position = '主管'

          function checkboxselect () {
            var id = ''

            for (x = 0;x < $scope.checkbox.length;x++) {
              if ($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined) {
                id = id + $scope.checkbox[x].column + ','
                $scope.checkbox[x] = null
              }
            }
            return id.substring(0, id.length - 1)
          }

          $scope.checkbox = []

          $scope.checkall = function (o) {
            var check = document.getElementById('check')
            var cb = document.getElementsByName('cb')

            if (check.checked) {
              for (x = 0;x < cb.length;x++) {
                if (!cb[x].checked) {
                  cb[x].click()
                }
              }
            } else {
              for (x = 0;x < cb.length;x++) {
                if (cb[x].checked) {
                  cb[x].click()
                }
              }
            }
          }

          $scope.recycle = async function () {
            var editmsg = {id: checkboxselect()}

            if (editmsg.id == '') {
              alertbox('danger', '请选择操作对象')
              return;
            }
            $scope.flag = true

            editmsg.note = $scope.rcl

            var check = document.getElementById('check')
            if (check.checked) {
              check.click()
            }

            const response = await listdprt.rcl(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '置入回收站成功')
              showdprt()
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
            $scope.flag = false
          }

          $scope.changeposition = async function () {
            var editmsg = {}

            editmsg.id = checkboxselect()

            if (editmsg.id == '') {
              alertbox('danger', '请选择操作对象')
              return;
            }

            const confirm = window.confirm('确认修改职位吗?')

            var check = document.getElementById('check')

            if (check.checked) {
              check.click()
            }

            if (!confirm) {
              var cb = document.getElementsByName('cb')

              for (x = 0;x < cb.length;x++) {
                if (cb[x].checked) {
                  cb[x].click()
                }
              }
            }

            var check = document.getElementById('check')

            if (check.checked) {
              check.click()
            }

            if (confirm) {
              $scope.flag = true

              editmsg.position = $scope.position

              const response = await listdprt.position(editmsg)

              userService.cookieset(response.data.token)

              if (userService.result(response.data.code)) {
                alertbox('success', '修改职位成功')
                showdprt()
              } else {
                alertbox('danger', userService.hint(response.data.code))
              }

              $scope.flag = false
            }
          }

          $scope.reset = function () {
            var resetid = checkboxselect()

            if (resetid != '') {
              location.href = '#/list/reset/' + resetid

            } else {
              alertbox('danger', '请选择操作对象')

            }

          }

        }
      })

  })
