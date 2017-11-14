import Vue from 'vue'
import Router from './routing/router'
import Store from './state/store'
import apolloProvider from './graphql/apolloProvider.js'
import VueGraphSocket from './plugins/vue-graph-socket'
import GraphQLConfig from './graphql/graphql.json'
import App from '../components/App.vue'
import '../scss/_base.scss'

Vue.use(VueGraphSocket, { 
  uri: GraphQLConfig.subscriptionsEndpoint,
  protocol: 'graphql-subscriptions'
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
