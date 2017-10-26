let Vue = require('../vendor/vue')
let { ApolloClient, createBatchingNetworkInterface } = require('apollo-client')
let VueApollo = require('vue-apollo')
let config = require('./graphql.json')

const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: config.simpleApiEndpoint
  }),
  connectToDevTools: config.useDevTools
})
  
Vue.use(VueApollo)
  
const apolloProvider = new VueApollo.ApolloProvider({
  defaultClient: apolloClient
})

module.exports = apolloProvider
