const mutations = function (state) {
  return {
    setObiAdvice (state, text) {
      state.obiAdvice = text
    },
    setAnakinThreat (state, text) {
      state.anakinThreat = text
    },
    setTasks (state, tasks) {
      state.tasks.items = tasks
    },
    setTasksCompleted (state, tasks) {
      state.tasks.completed = tasks
    },
    addTask (state, task) {
      state.tasks.items.push(task)
    }
  }
}

module.exports = mutations
