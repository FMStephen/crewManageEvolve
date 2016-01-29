angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('list.all', {
        url: '/all/:dprt&:position&:keyword/:current',
        templateUrl: 'templates/list/list-all.html',
        controller($scope, $stateParams, listall, userService) {

          moreMenu()
          naviSecondery(0)

          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          var x = $stateParams.current | 0

          $scope.dprtopt = dprt
          $scope.positionopt = position

          $scope.dprt = $stateParams.dprt
          $scope.position = $stateParams.position
          $scope.keyword = $stateParams.keyword
          $scope.current = $stateParams.current

          var editmsg = {
            current: x,
            count: 15,
            filter: {
              dprt: $stateParams.dprt,
              position: $stateParams.position,
              keyword: $stateParams.keyword,
            },
          }

          listall.show(editmsg)
            .then(function (response) {
              userService.cookieset(response.data.token)
              if (userService.result(response.data.code)) {
                $scope.members = response.data.data.members
                $scope.total = response.data.data.total
                $scope.editor = response.data.data.editor
              }
            })

          document.getElementById('search').focus()

          $scope.isEdit = function (value) {
            return !!value;
          }

          $scope.filter = function () {
            location.href = `#list/all/${$scope.dprt}&${$scope.position}&${$scope.keyword}/1`
          }

          $scope.reset = function () {
            location.href = '#list/all/&&/1'
          }

          $scope.pagenext = function () {
            if ((x + 1) <= $scope.total) {
              location.href = `#list/all/${$scope.dprt}&${$scope.position}&${$scope.keyword}/${x + 1}`
            } else {
              alertbox('danger', '已经是最后一页')
            }
          }

          $scope.pageprev = function () {
            if ((x - 1) >= 1) {
              location.href = `#list/all/${$scope.dprt}&${$scope.position}&${$scope.keyword}/${x - 1}`
            } else {
              alertbox('danger', '已经是第一页')
            }
          }
        }
      })
  })
