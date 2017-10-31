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
            div(v-for='task in tasks' 
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
import TaskQueries from '../graphql/queries/tasks.js'

export default {
  data: () => {
    return {
      title: 'Tasks',
      completedTitle: 'Completed'
    }
  },
  apollo: {
    allTasks: {
      query: TaskQueries.ascending,
      loadingKey: 'loading',
    },
  },
  created: function() {
    this.getTasks()
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
    },
    getTasks: function() {
      let taskQuery = this.$apollo.queries.allTasks
        .refetch()
        .then( ({ data }) => {
          this.$store.dispatch('setTasks', data.allTasks)
        })
        .catch( (error) => {
          console.log(error)
        })
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