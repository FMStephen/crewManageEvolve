angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('user.info', {
        url: '/info',
        templateUrl: 'templates/user/info-detail.html',
        controller($scope, $state, userinfo) {

          moreMenu()
          naviSecondery(0)

          userinfo.show()
            .then(function ({ data }) {
              $scope.content = data
            })
        }
      })
  })
