angular.module('app')

  .service('listall', requestService => {
    
    return {

      show(data) {
        return requestService.post('User/listall', { data })
      },

      detail(data) {
        return requestService.post('User/othersinfo', { data })
      }
    }
  })
