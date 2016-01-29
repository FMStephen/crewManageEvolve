angular.module('app')

  .service('userService', requestService => {

    return {

      login(user) {
        return requestService.post('Login', {
          studentno: user.studentNo,
          password: md5(user.password),
        })
      },

      logout(user) {
        requestService.post('User/logout', requestService.auth())
        $cookies.remove('token')
      },

      show() {
        return requestService.post('User/info')
      },

      edit(data) {
        return requestService.post('User/infoEdit', { data })
      },

      password(editmsg) {
        return requestService.post('User/pwEdit', {
          data: {
            old: md5(editmsg.old),
            cfrm: md5(editmsg.cfrm),
            'new': md5(editmsg['new']),
          }
        })
      }
    }
  })
