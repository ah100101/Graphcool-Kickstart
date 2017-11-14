let subscriptionHandlers = {
  init_success: {},
  init_fail: {},
  subscription_data: {},
  subscription_success: {},
  subscription_fail: {}
}

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
          throw { message: 'init_fail returned from WebSocket server' }
        }
        case 'subscription_data': {
            if (subscriptionHandlers.subscription_data[data.id]) {
              subscriptionHandlers.subscription_data[data.id](data)
            } else {
              throw { message: `subscription_data handler not found for id = ${data.id}` }
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
          throw { message: 'subscription_fail returned from WebSocket server' }
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
        handleMessages(socket, params)
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
        let message = {
          id: params.id,
          type: 'subscription_start',
          query: params.query
        }

        subscriptionHandlers.subscription_data[params.id] = params.onSubData

        if (this.opened) {
          this.sendMessage(message)
        } else {
          params.onInitSuccess = () => {
            this.opened = true
            this.sendMessage(message)
          }
          this.openConnection(params)
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

export default VueGraphSocketPlugin
