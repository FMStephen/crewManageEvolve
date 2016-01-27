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
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.content = {}

          function showdprt () {

            listdprt.show()

              .then(({ data }) => {
                $scope.members = data.members
                $scope.editor = data.editor
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })
          }

          showdprt()

          $scope.isEdit = function (value) {
            return !!value
          }

          $scope.checkbox = []
          $scope.rcl = '退休'
          $scope.position = '主管'

          function checkboxselect () {
            var id = []
            for (let x = 0; x < $scope.checkbox.length; x++) {
              if ($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined) {
                id.push($scope.checkbox[x].column)
                $scope.checkbox[x] = null
              }
            }
            return id.join(',')
          }

          $scope.checkbox = []

          $scope.checkall = function (o) {
            var check = document.getElementById('check')
            var cb = document.getElementsByName('cb')

            const checked = check.checked

            for (let x = 0; x < cb.length; x++) {
              cb[x].checked = checked
            }
          }

          $scope.recycle = function () {

            const id = checkboxselect()

            if (!id) {
              alertbox('danger', '请选择要操作的对象')
              return
            }

            var check = document.getElementById('check')
            if (check.checked) {
              check.click()
            }

            $scope.flag = true

            listdprt.rcl({ id, note: $scope.rcl })

              .then(() => {
                alertbox('success', '置入回收站成功')
                showdprt()
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }

          $scope.changeposition = function () {

            const id = checkboxselect()

            if (!id) {
              alertbox('danger', '请选择要操作的对象')
              return
            }

            if (!window.confirm('确认修改职位吗?')) {
              return
            }

            var check = document.getElementById('check')
            if (check.checked) {
              check.click()
            }

            $scope.flag = true

            listdprt.position({ id, position: $scope.position })

              .then(() => {
                alertbox('success', '修改职位成功')
                showdprt()
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }

          $scope.reset = function () {
            var id = checkboxselect()
            if (id) {
              $state.go('list.reset', { id })
            } else {
              alertbox('danger', '请选择操作对象')
            }
          }
        }
      })
  })
