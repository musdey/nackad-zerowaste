export type GraphQLProduct = {
  id: string
  title: string
  deposit?: null | {
    value?: string
  }
  url?: string
}
