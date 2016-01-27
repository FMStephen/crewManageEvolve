angular.module('app')

  .service('listdprt', function ($http, userService) {
    return {
      show: function () {
        var postdata = {}

        postdata.auth = userService.auth()

        return $http.post(host + 'User/dprtall', postdata)

      },

      addshow: function () {
        var postdata = {}

        postdata.auth = userService.auth()

        return $http.post(host + 'User/getUnCompleted', postdata)

      },

      resetshow: function (editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/pwApply', postdata)

      },

      add: function (editmsg) {
        var postdata = {}
        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/batchAdd', postdata)

      },

      rcl: function (editmsg) {
        var postdata = {}
        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/rcl', postdata)

      },

      position: function (editmsg) {
        var postdata = {}
        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/groupChange', postdata)

      },

      reset: function (editmsg) {
        var postdata = {}
        postdata.data = {}

        postdata.auth = userService.auth()
        postdata.data.id = editmsg.id
        postdata.data.pw = md5(editmsg.pw)
        postdata.data.pwcfrm = md5(editmsg.pwcfrm)

        return $http.post(host + 'User/pwReset', postdata)

      }

    }
  })
