angular.module('app')

  .service('listrcl', requestService => {

    return {

      show(data) {
        return requestService(host + 'User/listRcl', { data })
      },

      del(data) {
        return requestService(host + 'User/del', { data })
      },

      recover(data) {
        return requestService(host + 'User/recover', { data })
      }
    }
  }
)
