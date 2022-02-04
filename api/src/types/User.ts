const Languages = {
  FRENCH: 'FRENCH',
  ENGLISH: 'ENGLISH',
  KLINGON: 'KLINGON',
} as const

type Language = typeof Languages[keyof typeof Languages]

type Avatar = {
  '64x64': string
  '256x256': string
  '512x512': string
}

type User = {
  id: string
  avatar: Avatar
  firstname: string
  lastname: string
  language: Language
  birthDate: string
  isVisible: boolean
  retribution: number
}

export { Languages }
export type { Avatar, User, Language }
