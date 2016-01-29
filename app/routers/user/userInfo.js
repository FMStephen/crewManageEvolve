angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('user.info', {
        url: '/info',
        templateUrl: 'templates/user/info-detail.html',
        controller($scope, $state, userService) {

          moreMenu()
          naviSecondery(0)

          userService.show()
            .then(function ({ data }) {
              $scope.content = data
            })
        }
      })
  })
