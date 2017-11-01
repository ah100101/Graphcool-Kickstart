let gql = require('graphql-tag')

const mutations = {
  deleteTask: gql `
    mutation deleteTask($id: ID!) {
      deleteTask(id: $id) {
        id
        }
      }
      `,
  createTask: gql `
    mutation createTask($text: String!, $done: Boolean!) {
      createTask(text: $text, done: $done) {
        id
        text
        done
      }
    }
    `
}

module.exports = mutations
