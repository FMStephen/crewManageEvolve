angular.module('app')

  .service('userinfo', requestService => {
    return {
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
  }
)
