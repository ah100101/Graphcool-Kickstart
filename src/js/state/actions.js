const actions = {
  setObiAdvice: (context, text) => {
    context.commit('setObiAdvice', text)
  },
  setAnakinThreat: (context, text) => {
    context.commit('setAnakinThreat', text)
  },
  setTasks: (context, tasks) => {
    context.commit('setTasks', tasks)
  },
  setTasksCompleted: (context, tasks) => {
    context.commit('setTasksCompleted', tasks)
  },
  addTask: (context, task) => {
    context.commit('addTask', task)
  }
}

module.exports = actions
