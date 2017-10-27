<style>

</style>

<template lang="pug">
    section
        input(v-model='taskTitle')
        button(v-on:click='addTask()'
               v-html='buttonTitle')
</template>

<script>
export default {
  data () {
    return {
      buttonTitle: 'Add Task',
      taskTitle: ''
    }
  },
  methods: {
    addTask: function() {
      if(this.taskTitle !== '') {
        this.$store.dispatch('addTask', this.taskTitle)
        this.taskTitle = ''
      }
    }
  },
  computed: {
      
  }
}
</script>