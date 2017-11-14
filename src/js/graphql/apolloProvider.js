import Vue from 'vue'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import config from './graphql.json'

let VueApollo = require('vue-apollo')

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

export default apolloProvider
