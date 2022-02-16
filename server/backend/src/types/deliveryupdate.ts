type DeliveryUpdate = {
  id: number
  order_id: number
  status: string
  created_at: string
  service: string
  updated_at: string
  tracking_company: null
  shipment_status: string
  location_id: number
  origin_address: null
  email: string
  destination: {
    first_name: string
    address1: string
    phone: string
    city: string
    zip: string
    province: null
    country: string
    last_name: string
    address2: string
    company: string
    latitude: number
    longitude: number
    name: string
    country_code: string
    province_code: null
  }
  line_items: [
    {
      id: number
      variant_id: number
      title: string
      quantity: 2
      sku: string
      variant_title: string
      vendor: string
      fulfillment_service: string
      product_id: number
      requires_shipping: true
      taxable: true
      gift_card: false
      name: string
      variant_inventory_management: null
      properties: []
      product_exists: true
      fulfillable_quantity: 0
      grams: 0
      price: string
      total_discount: string
      fulfillment_status: string
      price_set: [object]
      total_discount_set: [object]
      discount_allocations: []
      duties: []
      admin_graphql_api_id: string
      tax_lines: []
      origin_location: [object]
      destination_location: [object]
    }
  ]
  tracking_number: null
  tracking_numbers: []
  tracking_url: null
  tracking_urls: []
  receipt: object
  name: string
  admin_graphql_api_id: string
}

export default DeliveryUpdate
