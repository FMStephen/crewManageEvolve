angular.module('app')

  .service('listdprt', requestService => {
    
    return {

      show() {
        return requestService.post('User/dprtall')
      },

      addshow() {
        return requestService.post('User/getUnCompleted')
      },

      resetshow(data) {
        return requestService.post('User/pwApply', { data })
      },

      add(data) {
        return requestService.post('User/batchAdd', { data })
      },

      rcl(data) {
        return requestService.post('User/rcl', { data })
      },

      position(data) {
        return requestService.post('User/groupChange', { data })
      },

      reset(editmsg) {
        return requestService.post('User/pwReset', {
          data: {
            id: editmsg.id,
            pw: md5(editmsg.pw),
            pwcfrm: md5(editmsg.pwcfrm),
          },
        })
      }

    }
  })
