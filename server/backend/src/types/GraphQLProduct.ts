export type GraphQLProduct = {
  cursor: string
  node: {
    id: string
    title: string
    metafields: {
      edges: [
        {
          node: {
            key: string
            value: string
          }
        }
      ]
    }
  }
}
