let Vue = require('../vendor/vue')
let VueRouter = require('vue-router')
let Empire = require('../components/Empire.vue')
let Rebels = require('../components/Rebels.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/empire', component: Empire },
    { path: '/rebels', component: Rebels }
  ]
})

module.exports = router
