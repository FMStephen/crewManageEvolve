angular.module('app')

  .service('userService', function ($http, $cookies) {
    return {
      login: function (editmsg) {
        var user = {}

        user.studentno = editmsg.studentNo
        user.password = md5(editmsg.password)

        return $http.post(host + 'Login', user)
        // return $http.post('http://localhost/angular/crewManageEvolve/test.php',user)

      },

      logincheck: function () {
        return token = $cookies.get('token')

      },

      logout: function (user) {
        var timestamp = new Date().getTime()
        var token = $cookies.get('token')
        var auth = token + '.' + timestamp + '.' + encrypt(token + ':' + timestamp)

        $http.post(host + 'User/logout', auth)

        $cookies.remove('token')

      },

      auth: function () {
        var timestamp = new Date().getTime()
        var token = $cookies.get('token')
        var auth = token + '.' + timestamp + '.' + encrypt(token + ':' + timestamp)

        return auth

      },

      cookieset: function (editmsg) {
        var date = new Date()
        date.setDate(date.getDate() + 7)
        var expire = date

        $cookies.put('token', editmsg, { 'expires': expire})

        return true

      },

      result: function (editmsg) {
        switch (editmsg) {
          case 101:
            // alert("存在未输入项")
            return false
            break

          case 102:
            // alert("账号错误")
            return false
            break

          case 103:
            // alert("密码错误");、
            return false
            break

          case 104:
            // alert("宿舍号有误")
            return false
            break

          case 105:
            // alert("新旧密码相同")
            return false
            break

          case 106:
            // alert("确认密码不一致")
            return false
            break

          case 107:
            // alert("旧密码错误")
            return false
            break

          case 108:
            // alert("操作对象不能包含自己")
            return false
            break

          case 200:
            return true
            break

          case 201:
            // alert("请先完善个人资料")
            location.href = '#/user/infoedit'
            return false
            break

          case 202:
            // alert("部分添加成功,未成功条目已在学号框中呈现,请检查输入")
            return false
            break

          case 302:
            alert('账号异常，请重新登录')
            location.href = '#/login'
            return false
            break

          case 403:
            // alert("你不具有操作权限")
            return false
            break

          case 404:
            // alert("你不具有查看权限")
            //	history.back()
            return false
            break

          case 500:
            // alert("未知错误")
            return false
            break
        }



      },

      hint: function (editmsg) {
        switch (editmsg) {
          case 101:
            // alert("存在未输入项")
            return '存在未输入项'
            break

          case 102:
            return '账号或密码错误'
            break

          case 103:
            // location.href = '#/login'
            return '账号或密码错误, 如忘记密码请咨询部长'
            break

          case 104:
            // alert("宿舍号有误")
            return '宿舍号有误'
            break

          case 105:
            // alert("新旧密码相同")
            return '新旧密码相同'
            break

          case 106:
            // alert("确认密码不一致")
            return '确认密码不一致'
            break

          case 107:
            // alert("旧密码错误")
            return '旧密码错误'
            break

          case 108:
            // alert("操作对象不能包含自己")
            return '操作对象不能包含自己'
            break

          case 201:
            // alert("用户资料未完善")
            return '请先完善个人资料'
            break

          case 202:
            // alert("部分添加成功,未成功条目已在学号框中呈现,请检查输入")
            return '部分添加成功，未成功条目已在输入框中列出，请检查'
            break

          case 302:
            // alert("账号异常，请重新登录")
            return ''
            break

          case 403:
            // alert("你不具有操作权限")
            return '你不具有该操作权限'
            break

          case 404:
            // alert("你不具有查看权限")
            //	history.back()
            return '你不具有该查看权限'
            break

          case 500:
            // alert("未知错误")
            return '未知错误'
            break
        }



      }

    }
  })
