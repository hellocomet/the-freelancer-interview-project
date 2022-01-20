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
