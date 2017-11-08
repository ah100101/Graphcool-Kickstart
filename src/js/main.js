let Vue = require('./vendor/vue')
let Store = require('./state/store.js')
let App = require('./components/App.vue')
let Router = require('./routing/router.js')
let apolloProvider = require('./graphql/apolloProvider.js')
let VueGraphSocket = require('./plugins/vue-graph-socket.js')

Vue.use(VueGraphSocket, { 
  uri: 'wss://subscriptions.us-west-2.graph.cool/v1/cj99ayg117f5401353arjtfgy',
  protocol: 'graphql-subscriptions'
})

new Vue({
  el: '#app',
  store: Store,
  router: Router,
  apolloProvider,
  created: function () {
    
  },
  components: {
    app: App
  }
})
