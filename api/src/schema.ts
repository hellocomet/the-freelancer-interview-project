import { gql } from 'graphql-tag'
import { Language, Resolvers } from '../generated/graphql'

const MOCK_FREELANCER = {
  avatar: {
    '64x64': '',
    '256x256': '',
    '512x512': '',
  },
  firstname: 'Gordon',
  lastname: 'Champlin',
  language: Language.KLINGON,
  birthDate: new Date(1990, 12, 31).toISOString(),
  isVisible: false,
  retribution: 500,
}

export const typeDefs = gql`
  type Avatar {
    smallUrl: String!
    largeUrl: String!
    xLargeUrl: String!
  }

  enum Language {
    FRENCH
    ENGLISH
    KLINGON
  }

  # Todo: Write a type for the freelancer's profile.

  type Query {
    helloWorld: String!

    # Todo: Write a query to retrieve the current freelancer's profile.
    # Ex: myProfile: Profile!
  }

  # Todo: Write a mutation to update the current freelancer's profile.
  # type Mutation {
  #   ...
  # }
`

export const resolvers: Resolvers = {
  Query: {
    /**
     * Example of resolver.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    helloWorld(root, args, context) {
      return 'Hello!'
    },

    /**
     * @Todo
     * Implement the query to retrieve the current freelancer's profile.
     */
  },

  /**
   * @Todo
   * Implement the mutation to update the current freelancer's profile.
   */
  // Mutation: {},
}
