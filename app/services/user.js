angular.module('app')

  .service('userService', requestService => {

    return {

      login(userInfo) {
        return requestService.post('Login', {
          studentno: userInfo.studentNo,
          password: md5(userInfo.password),
        })
      },

      logout(user) {
        requestService.post('User/logout', requestService.auth())
        $cookies.remove('token')
      }
    }
  })
