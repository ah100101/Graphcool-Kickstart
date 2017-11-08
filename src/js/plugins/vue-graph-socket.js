const attemptOpen = (uri, protocol) => {
  return new WebSocket(uri, protocol)
}

const sendHandshake = (socket) => {
  socket.onopen = (event) => {
    const message = {
      type: 'init'
    }
    socket.send(JSON.stringify(message))
  }
}

const handleMessages = (socket, handlers) => {
  if (socket && handlers) {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case 'init_success': {
          if (handlers.onInitSuccess) {
            handlers.onInitSuccess()
          }
          break
        }
        case 'init_fail': {
          if (handlers.onInitFail) {
            handlers.onInitFail(data)
          }
          throw {
            message: 'init_fail returned from WebSocket server',
          }
        }
        case 'subscription_data': {
          if (handlers.onSubData) {
            handlers.onSubData(data)
          }
          break
        }
        case 'subscription_success': {
          if (handlers.onSubSuccess) {
            handlers.onSubSuccess()
          }
          break
        }
        case 'subscription_fail': {
          if (handlers.onSubFail) {
            handlers.onSubFail(data)
          }
          throw {
            message: 'subscription_fail returned from WebSocket server',
          }
        }
      }
    }
  }
}

const VueGraphSocketPlugin = {

  install (Vue, options) {
    Vue.prototype.$graphsocket = {
      opened: false,
      socket: undefined,
      protocol: options.protocol,
      uri: options.uri,
      openConnection: function (params) {
        let socket = attemptOpen(options.uri, options.protocol)
        sendHandshake(socket)
        handleMessages(socket, {
          onInitSuccess: params.onInitSuccess,
          onSubData: params.onSubData
        })
        this.socket = socket
      },
      closeConnection: function () {
        this.socket.close()
        this.opened = false
      },
      sendMessage: function (message) {
        this.socket.send(JSON.stringify(message))
      },
      subscribeToChanges: function (params) {
        if (this.opened) {
          // send sub message and subscribe to sub with call back
        } else {
          params.onInitSuccess = () => {
            this.opened = true
            this.socket.send(JSON.stringify({
              id: params.id,
              type: 'subscription_start',
              query: params.query
            }))
          }

          this.openConnection(params)

          // this.openConnection(() => {
          //   this.opened = true
          //   this.socket.send(JSON.stringify({
          //     id: params.id,
          //     type: 'subscription_start',
          //     query: params.query
          //   }))
          // }, params.onSubData)
        }
      },
      unsubscribeFromChanges: function (id) {
        this.sendMessage({
          id,
          type: 'subscription_end'
        })
      }
    }

    Vue.mixin({
      created () {

      },
      mounted () {

      },
      destroyed () {

      }
    })
  }
}

module.exports = VueGraphSocketPlugin
