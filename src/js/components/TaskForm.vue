<style>

</style>

<template lang="pug">
    section
        input(v-model='taskTitle')
        button(v-on:click='addTask()'
               v-html='buttonTitle')
</template>

<script>
import gql from 'graphql-tag'

const createTask = gql `
    mutation createTask($text: String!, $done: Boolean!) {
      createTask(text: $text, done: $done) {
        id
        text
        done
      }
    }
  `

export default {
  data () {
    return {
      buttonTitle: 'Add Task',
      taskTitle: ''
    }
  },
  methods: {
    addTask_old: function() {
      if(this.taskTitle !== '') {
        this.$store.dispatch('addTask', this.taskTitle)
        this.taskTitle = ''
      }
    },
    addTask: function() {
      if(this.taskTitle !== '') {

        const text = this.taskTitle
        const done = false

        this.$apollo.mutate({
          mutation: createTask,
          variables: {
            text,
            done
          }
        })
        .then(({data}) => {
          //console.log(data.createTask)
          // tasks currently not bound so this isn't going to work
          this.$store.dispatch('addTask', data.createTask)
          this.taskTitle = ''
        })


        // this.$store.dispatch('addTask', this.taskTitle)
      }
    }
  },
  computed: {
      
  }
}
</script>