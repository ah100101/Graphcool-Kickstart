let Vue = require('./vendor/vue')
let Store = require('./state/store.js')
let App = require('./components/App.vue')
let Router = require('./routing/router.js')

new Vue({
  el: '#app',
  store: Store,
  router: Router,
  components: {
    app: App
  }
})
