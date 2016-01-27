angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.all', {
        url: '/all/:dprt&:position&:keyword/:current',
        templateUrl: 'templates/list/list-all.html',
        controller($scope, $stateParams, $state, listall) {

          moreMenu()
          naviSecondery(0)

          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          var current = $stateParams.current | 0

          $scope.dprtopt = dprt
          $scope.positionopt = position

          $scope.dprt = $stateParams.dprt
          $scope.position = $stateParams.position
          $scope.keyword = $stateParams.keyword
          $scope.current = $stateParams.current

          listall.show({
            current: current,
            count: 15,
            filter: {
              dprt: $stateParams.dprt,
              position: $stateParams.position,
              keyword: $stateParams.keyword,
            },
          })

            .then(({ data }) => {
              $scope.members = data.members
              $scope.total = data.total
              $scope.editor = data.editor
            })

            .catch(({ message }) => {
              alertbox('danger', message)
            })

          document.getElementById('search').focus()

          $scope.isEdit = function (value) {
            return !!value;
          }

          $scope.filter = function () {
            $state.go('list.all', { dprt: $scope.dprt, position: $scope.position, keyword: $scope.keyword, current: 1 })
          }

          $scope.reset = function () {
            $state.go('list.all', { current: 1 })
          }

          $scope.pagenext = function () {
            if ((current + 1) <= $scope.total) {
              $state.go('list.all', { dprt: $scope.dprt, position: $scope.position, keyword: $scope.keyword, current: current + 1 })
            } else {
              alertbox('danger', '已经是最后一页')
            }
          }

          $scope.pageprev = function () {
            if ((current - 1) >= 1) {
              $state.go('list.all', { dprt: $scope.dprt, position: $scope.position, keyword: $scope.keyword, current: current - 1 })
            } else {
              alertbox('danger', '已经是第一页')
            }
          }
        }
      })
  })
