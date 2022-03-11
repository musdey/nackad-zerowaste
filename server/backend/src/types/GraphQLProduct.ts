export type GraphQLProduct = {
  cursor: string
  node: {
    id: string
    title: string
    deposit: null | {
      value: string
    }
  }
}
