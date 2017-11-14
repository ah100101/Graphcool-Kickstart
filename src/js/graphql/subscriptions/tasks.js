const subscriptions = {
  create: `
  subscription newTask {
    Task(filter: { mutation_in: [CREATED] }) {
      mutation
        node {
          id
          text
          done
        }
      }
    }
    `
}

export default subscriptions
