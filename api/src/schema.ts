import { gql } from 'graphql-tag'
import { Resolvers } from '../generated/graphql'

export const typeDefs = gql`
  type Avatar {
    smallUrl: String
    largeUrl: String
    xLargeUrl: String
  }

  enum Language {
    FRENCH
    ENGLISH
    KLINGON
  }

  # Todo
  # type Profile {
  #   ...
  # }

  type Query {
    helloWorld: String
    # Todo
    # myProfile: Profile
  }

  # Todo
  # type Mutation {
  #   ...
  # }
`

export const resolvers: Resolvers = {
  Query: {
    helloWorld(root, args, context) {
      return 'Hello!'
    },
  },

  /**
   * @Todo
   */
  // Mutation: {},
}
