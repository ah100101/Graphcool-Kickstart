let Vue = require('../vendor/vue')
let VueRouter = require('vue-router')
let List = require('../components/List.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: List }
  ]
})

module.exports = router
