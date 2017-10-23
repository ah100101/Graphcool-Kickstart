var Vue = require('../vendor/vue')
var Vuex = require('../vendor/vuex')

var Getters = require('./getters.js')
var Actions = require('./actions.js')
var Mutations = require('./mutations.js')
var State = require('./defaultState.js')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: State,
  mutations: Mutations(this.state),
  actions: Actions,
  getters: Getters.mapGetters(this.state, State)
})

module.exports = store
