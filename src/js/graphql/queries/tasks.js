import gql from 'graphql-tag'

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

export default queries
