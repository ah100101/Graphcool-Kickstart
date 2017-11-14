import Vue from 'vue'
import Vuex from 'vuex'

import Getters from './getters.js'
import Actions from './actions.js'
import Mutations from './mutations.js'
import State from './defaultState.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: State,
  mutations: Mutations(this.state),
  actions: Actions,
  getters: Getters.mapGetters(this.state, State)
})

export default store
