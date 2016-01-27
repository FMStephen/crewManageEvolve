angular.module('app')

  .service('userService', ($http, $cookies) => {

    const errorMessage = {
      '101': '存在未输入项',
      '102': '账号错误',
      '103': '密码错误',
      '104': '宿舍号有误',
      '105': '新旧密码相同',
      '106': '确认密码不一致',
      '107': '旧密码错误',
      '108': '操作对象不能包含自己',
      '201': '请先完善个人资料',
      '202': '部分添加成功,未成功条目已在学号框中呈现,请检查输入',
      '302': '账号异常，请重新登录',
      '403': '你不具有操作权限',
      '404': '你不具有查看权限',
      '500': '未知错误',
    }

    return {

      login(editmsg) {
        var user = {
          studentno: editmsg.studentNo,
          password: md5(editmsg.password),
        }

        return $http.post(host + 'Login', user)
      },

      logincheck() {
        return window.token = $cookies.get('token')
      },

      logout(user) {
        var timestamp = new Date().getTime()
        var token = $cookies.get('token')
        var auth = `${token}.${timestamp}.${encrypt(`${token}:${timestamp}`)}`

        $http.post(host + 'User/logout', auth)

        $cookies.remove('token')
      },

      auth() {
        var timestamp = new Date().getTime()
        var token = $cookies.get('token')
        var auth = `${token}.${timestamp}.${encrypt(`${token}:${timestamp}`)}`

        return auth
      },

      cookieset(editmsg) {
        var date = new Date()
        date.setDate(date.getDate() + 7)
        var expire = date

        $cookies.put('token', editmsg, { 'expires': expire})

        return true
      },

      result(editmsg) {
        switch (editmsg) {

          case 200:
            return true

          case 201: // 请先完善个人资料
            location.href = '#/user/infoedit'
            break

          case 302: // 账号异常，请重新登录
            alert('账号异常，请重新登录')
            location.href = '#/login'
            break
        }
        return false
      },

      hint(editmsg) {
        return errorMessage[editmsg]
      }
    }
  })
