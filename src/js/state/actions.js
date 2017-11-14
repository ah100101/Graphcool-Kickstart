const actions = {
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

export default actions
