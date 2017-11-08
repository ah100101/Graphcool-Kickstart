<style>

</style>

<template lang="pug">
    section
        input(v-model='taskTitle')
        button(v-on:click='addTask()'
               v-html='buttonTitle')
</template>

<script>
import TaskMutations from '../graphql/mutations/tasks.js'

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

        const text = this.taskTitle
        const done = false
        
        this.$apollo.mutate({
          mutation: TaskMutations.createTask,
          variables: {
            text,
            done
          }
        })
        .then(({data}) => {
          this.taskTitle = ''
        })
      }
    }
  },
  computed: {
      
  }
}
</script>