let Vue = require('./vendor/vue')
let Store = require('./state/store.js')
let App = require('./components/App.vue')
let Router = require('./routing/router.js')
// let ApolloProvider = require('./graphql/apolloProvider.js')

// console.log(ApolloProvider)

let { ApolloClient, createBatchingNetworkInterface } = require('apollo-client')
let VueApollo = require('vue-apollo')

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:3020/graphql',
  }),
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo.ApolloProvider({
  defaultClient: apolloClient,
})

new Vue({
  el: '#app',
  store: Store,
  router: Router,
  apolloProvider,
  components: {
    app: App
  }
})
