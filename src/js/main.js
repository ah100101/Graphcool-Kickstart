let Vue = require('./vendor/vue')
let Store = require('./state/store.js')
let App = require('./components/App.vue')
let Router = require('./routing/router.js')
let apolloProvider = require('./graphql/apolloProvider.js')

let webSocket = new WebSocket('wss://subscriptions.us-west-2.graph.cool/v1/cj99ayg117f5401353arjtfgy', 'graphql-subscriptions')

webSocket.onopen = (event) => {
  const message = {
    type: 'init'
  }

  webSocket.send(JSON.stringify(message))
}

webSocket.onmessage = (event) => {
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

// const message = {
//   id: '1',
//   type: 'subscription_start',
//   query: `
//     subscription newTasks {
//       Task(
//         filter: {
//           mutation_in: [CREATED]
//         }
//       ) {
//         mutation
//         node {
//           text
//           done
//         }
//       }
//     }
//     `
// }

// webSocket.send(JSON.stringify(message))

// const message = {
//   id: '1',
//   type: 'subscription_end'
// }

// webSocket.send(JSON.stringify(message))

new Vue({
  el: '#app',
  store: Store,
  router: Router,
  apolloProvider,
  components: {
    app: App
  }
})
