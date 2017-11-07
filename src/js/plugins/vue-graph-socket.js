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

const handleMessages = (socket, initCallback, subCallback) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'init_success': {
        initCallback()
        break
      }
      case 'init_fail': {
        throw {
          message: 'init_fail returned from WebSocket server',
          data
        }
      }
      case 'subscription_data': {
        subCallback(data)
        break
      }
      case 'subscription_success': {
        break
      }
      case 'subscription_fail': {
        throw {
          message: 'subscription_fail returned from WebSocket server',
          data
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
      openConnection: function (initCallback, subCallback) {
        let socket = attemptOpen(options.uri, options.protocol)
        sendHandshake(socket)
        handleMessages(socket, initCallback, subCallback)
        this.socket = socket
      },
      closeConnection: function () {
        this.socket.close()
        this.opened = false
      },
      sendMessage: function (message) {
        this.socket.send(JSON.stringify(message))
      },
      subscribeToChanges: function (id, query, subCallback) {
        if (this.opened) {
          // send sub message and subscribe to sub with call back
        } else {
          this.openConnection(() => {
            this.opened = true
            this.socket.send(JSON.stringify({
              id,
              type: 'subscription_start',
              query
            }))
          }, subCallback)
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
