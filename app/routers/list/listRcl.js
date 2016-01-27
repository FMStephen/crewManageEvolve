angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.recycle', {
        url: '/recycle/:current',
        templateUrl: 'templates/list/list-recycle.html',
        controller($scope, $stateParams, listrcl) {

          moreMenu()
          naviSecondery(2)

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

          const current = $stateParams.current | 0

          $scope.current = current

          listrcl.show({ current: current, count: 15 })

            .then(({ data }) => {
              $scope.members = data.members
              $scope.total = data.total
            })

            .catch(({ message }) => {
              alertbox('danger', message)
            })

          var cb = document.getElementsByName('cb')

          $scope.checkall = function (o) {
            var check = document.getElementById('check')
            var cb = document.getElementsByName('cb')

            const checked = check.checked

            for (x = 0;x < cb.length;x++) {
              cb[x].checked = checked
            }
          }

          $scope.pagenext = function () {
            if ((current + 1) <= $scope.total) {
              $state.go('list.recycle', { current: current + 1 })
            } else {
              alertbox('danger', '已经是最后一页')
            }
          }

          $scope.pageprev = function () {
            if ((current - 1) >= 1) {
              $state.go('list.recycle', { current: current - 1 })
            } else {
              alertbox('danger', '已经是第一页')
            }
          }

          $scope.checkbox = []

          function checkboxselect () {
            var id = []

            for (x = 0;x < $scope.checkbox.length;x++) {
              if ($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined) {
                id.push($scope.checkbox[x].column)
                $scope.checkbox[x] = null
              }
            }
            return id.join(',')
          }

          $scope.recover = function () {

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

            listrcl.recover({ id, position: $scope.position })

              .then(response => {
                alertbox('success', '恢复成功。对象被还原至部门列表')
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }

          $scope.del = function () {

            const id = checkboxselect()

            if (!id) {
              alertbox('danger', '请选择要操作的对象')
              return
            }

            if (!window.confirm('此操作将无法撤销,确认彻底删除吗?')) {
              return
            }

            var check = document.getElementById('check')
            if (check.checked) {
              check.click()
            }

            $scope.flag = true

            listrcl.del({ id, position: $scope.position })

              .then(() => {
                alertbox('success', '彻底删除对象成功')
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
