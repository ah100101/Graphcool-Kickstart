import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../../components/List.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: List }
  ]
})

export default router
