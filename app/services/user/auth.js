angular.module('app')

  .service('authService', $cookies => {

    return {

      token: $cookies.get('token'),

      setToken(token) {
        this.token = token
        var expires = new Date()
        expires.setDate(expires.getDate() + 7)
        $cookies.put('token', token, { expires })
      }
    }
  })
