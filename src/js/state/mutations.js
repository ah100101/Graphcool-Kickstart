const mutations = function (state) {
  return {
    setTasks (state, tasks) {
      state.tasks.items = tasks
    },
    setTasksCompleted (state, tasks) {
      state.tasks.completed = tasks
    },
    addTask (state, task) {
      state.tasks.items = state.tasks.items.concat([task])
    }
  }
}

module.exports = mutations
