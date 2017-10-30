<style>
  .task {
      padding: 5px;
  }
</style>

<template lang="pug">
    section
        taskform
        h3(v-html='title')
        section
            div(v-for='task in allTasks' 
                class = 'task')
                button(v-on:click='completeTask(task)') Done
                span(v-html='task.text')
        br
        h3(v-html='completedTitle')
        section
            div(v-for='task in completedTasks' 
                class = 'task')
                span(v-html='task.text')
</template>

<script>
import TaskForm from './TaskForm.vue'
import gql from 'graphql-tag'

const TaskQuery = gql `
    query allTasks {
      allTasks(orderBy: text_DESC) {
        id
        text
        done
      }
    }
  `

export default {
  data: () => {
    return {
      allTasks: {},
      title: 'Tasks',
      completedTitle: 'Completed'
    }
  },
  apollo: {
    allTasks: {
      query: TaskQuery,
      loadingKey: 'loading',
    },
  },
  components: {
    taskform: TaskForm
  },
  methods: {
    completeTask: function(completedTask) {
      let tasksTodo = this.tasks.filter((task) => { return task.id !== completedTask.id })
      let tasksCompleted = this.completedTasks
      tasksCompleted.push(completedTask)
      this.$store.dispatch('setTasks', tasksTodo)
      this.$store.dispatch('setTasksCompleted', tasksCompleted)
    }
  },
  computed: {
    tasks: function() {
        return this.$store.getters.tasks.items
    },
    completedTasks: function() {
        return this.$store.getters.tasks.completed
    }
  }
}
</script>