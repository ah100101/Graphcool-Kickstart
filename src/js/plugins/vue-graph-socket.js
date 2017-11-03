const attemptOpen = (uri, protocol) => {
  let webSocket = new WebSocket(uri, protocol)
  return webSocket
}

const sendHandshake = (socket) => {
  socket.onopen = (event) => {
    const message = {
      type: 'init'
    }
    socket.send(JSON.stringify(message))
  }
}

const handleMessages = (socket) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'init_success': {
        console.log('init_success, the handshake is complete')
        break
      }
      case 'init_fail': {
        throw {
          message: 'init_fail returned from WebSocket server',
          data
        }
      }
      case 'subscription_data': {
        console.log('subscription data has been received', data)
        break
      }
      case 'subscription_success': {
        console.log('subscription_success')
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
      socket: undefined,
      protocol: options.protocol,
      uri: options.uri,
      openConnection: function () {
        let socket = attemptOpen(options.uri, options.protocol)
        sendHandshake(socket)
        handleMessages(socket)
        this.socket = socket
      },
      closeConnection: function () {

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
