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
import TaskMutations from '../graphql/mutations/tasks.js'
import TaskSubscriptions from '../graphql/subscriptions/tasks.js'
import config from '../graphql/graphql.json'

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
    }
  },
  created: async function() {
    let tasks = await this.getTasks()
    if (tasks) {
      this.$store.dispatch('setTasks', tasks)
    }

    this.$graphsocket.subscribeToChanges({
      id: '1',
      query: TaskSubscriptions.create,
      onSubData: this.addTask
    })
  },
  components: {
    taskform: TaskForm
  },
  methods: {
    displayData: function(data) {
      console.log(data)
    },
    addTask: function(data) {
      if (data && data.payload && data.payload.data && data.payload.data.Task && data.payload.data.Task.node) {
        let task = data.payload.data.Task.node
        this.$store.dispatch('addTask', task)
      }
    },
    completeTask: function(completedTask) {
      this.deleteTask(completedTask.id)
      
      let tasksTodo = this.tasks.filter((task) => { return task.id !== completedTask.id })
      let tasksCompleted = this.completedTasks
      tasksCompleted.push(completedTask)
      
      this.$store.dispatch('setTasks', tasksTodo)
      this.$store.dispatch('setTasksCompleted', tasksCompleted)
    },
    deleteTask: async function(id) {
      try {
        let result = await this.$apollo
          .mutate({
            mutation: TaskMutations.deleteTask,
            variables: { id }
          })
      } catch (error) {
        console.log(error)
        return
      }
    },
    getTasks: async function() {
      try {
        let result = await this.$apollo.queries.allTasks.refetch()
        return result.data.allTasks
      } catch (error) {
        console.log(error)
        return
      }
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