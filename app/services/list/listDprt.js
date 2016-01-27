angular.module('app')

  .service('listdprt', ($http, userService) => {
    return {
      show() {
        var postdata = {auth: userService.auth()}

        return $http.post(host + 'User/dprtall', postdata)
      },

      addshow() {
        var postdata = {auth: userService.auth()}

        return $http.post(host + 'User/getUnCompleted', postdata)
      },

      resetshow(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/pwApply', postdata)
      },

      add(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/batchAdd', postdata)
      },

      rcl(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/rcl', postdata)
      },

      position(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/groupChange', postdata)
      },

      reset(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: {
            id: editmsg.id,
            pw: md5(editmsg.pw),
            pwcfrm: md5(editmsg.pwcfrm),
          },
        }

        return $http.post(host + 'User/pwReset', postdata)
      }

    }
  })
