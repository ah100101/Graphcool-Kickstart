<style>

</style>

<template lang="pug">
    div
      h3(v-html='kenobiGreeting')
      h3(v-html='grievousGreeting')
      h3(v-html='sheevGreeting')
      padme
      div
        span(v-html='obiAdvice')
      div
        span(v-html='anakinThreat')
      div 
        button(v-on:click='executeOrderAnakinSlice()') *Tries it* 

      section
        div
          router-link(to = '/empire') View the Empire
        div
          router-link(to = '/rebels') View the Rebels
      section
        router-view
</template>

<script>
import PadmeGreeting from './Greeting.vue'

export default {
  data() {
    return {
      kenobiGreeting: 'Well, hello there!',
      grievousGreeting: 'General Kenobi...',
      sheevGreeting: 'Did you ever hear the tragedy of Darth Plagueis The Wise?'
    }
  },
  components: {
    padme: PadmeGreeting
  },
  methods: {
    executeOrderAnakinSlice: function() {
      console.log('yes my lord')
      this.$store.dispatch('setObiAdvice', '')
      this.$store.dispatch('setAnakinThreat', 'I HATE YOU')
    }
  },
  computed: {
    anakinMessage: function () {
      return this.$store.getters.anakinMessage
    },
    obiAdvice: function () {
      return this.$store.getters.obiAdvice
    },
    anakinThreat: function () {
      return this.$store.getters.anakinThreat
    }
  }
}
</script>