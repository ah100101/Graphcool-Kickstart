let gql = require('graphql-tag')

const queries = {
  ascending: gql `
    query allTasks {
      allTasks(orderBy: text_ASC) {
          id
          text
          done
        }
      }
    `
}

module.exports = queries
