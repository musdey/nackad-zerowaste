type line_items = {
  thumbnail?: string
  imgUrl?: string
  deposit?: {
    depositName: string
    pricePerItem: string
  }
  id?: number
  destination_location?: {
    id: number
    country_code: string
    province_code: string
    name: string
    address1: string
    address2: string
    city: string
    zip: string
  }
  variant_id?: number
  title?: string
  quantity?: number
  sku?: string
  variant_title?: string
  vendor?: string
  fulfillment_service?: string
  product_id?: number
  origin_location?: {
    id: number
    country_code: string
    province_code: string
    name: string
    address1: string
    address2: string
    city: string
    zip: string
  }
  requires_shipping?: boolean
  taxable?: boolean
  gift_card?: boolean
  name?: string
  variant_inventory_management?: string | null
  properties?: any[]
  product_exists?: boolean
  fulfillable_quantity?: number
  grams?: number
  price?: string
  total_discount?: string
  fulfillment_status?: string | null
  price_set?: {
    shop_money: {
      amount: string
      currency_code: string
    }
    presentment_money: {
      amount: string
      currency_code: string
    }
  }
  total_discount_set?: any
  discount_allocations?: any[]
  duties?: any[]
  admin_graphql_api_id?: string
  tax_lines?: any[]
}

export default line_items
