angular.module('app')

  .service('listrcl', requestService => {

    return {

      show(data) {
        return requestService.post('User/listRcl', { data })
      },

      del(data) {
        return requestService.post('User/del', { data })
      },

      recover(data) {
        return requestService.post('User/recover', { data })
      }
    }
  }
)
