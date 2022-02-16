type Cancellation = {
  id: number
  admin_graphql_api_id: string
  app_id: number
  browser_ip: string
  buyer_accepts_marketing: false
  cancel_reason: string
  cancelled_at: string
  cart_token: string
  checkout_id: number
  checkout_token: string
  client_details: {
    accept_language: string
    browser_height: number
    browser_ip: string
    browser_width: number
    session_hash: null
    user_agent: string
  }
  closed_at: null
  confirmed: true
  contact_email: string
  created_at: string
  currency: string
  current_subtotal_price: string
  current_subtotal_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  current_total_discounts: string
  current_total_discounts_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  current_total_duties_set: null
  current_total_price: string
  current_total_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  current_total_tax: string
  current_total_tax_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  customer_locale: string
  device_id: null
  discount_codes: []
  email: string
  estimated_taxes: false
  financial_status: string
  fulfillment_status: null
  gateway: string
  landing_site: string
  landing_site_ref: null
  location_id: null
  name: string
  note: string
  note_attributes: [{ name: string; value: string }]
  number: number
  order_number: number
  order_status_url: string
  original_total_duties_set: null
  payment_gateway_names: [string]
  phone: null
  presentment_currency: string
  processed_at: string
  processing_method: string
  reference: null
  referring_site: string
  source_identifier: null
  source_name: string
  source_url: null
  subtotal_price: string
  subtotal_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  tags: string
  tax_lines: []
  taxes_included: true
  test: true
  token: string
  total_discounts: string
  total_discounts_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  total_line_items_price: string
  total_line_items_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  total_outstanding: string
  total_price: string
  total_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  total_price_usd: string
  total_shipping_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  total_tax: string
  total_tax_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  total_tip_received: string
  total_weight: 0
  updated_at: string
  user_id: null
  billing_address: {
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
  customer: {
    id: number
    email: string
    accepts_marketing: true
    created_at: string
    updated_at: string
    first_name: string
    last_name: string
    orders_count: 0
    state: string
    total_spent: string
    last_order_id: null
    note: null
    verified_email: true
    multipass_identifier: null
    tax_exempt: false
    phone: null
    tags: string
    last_order_name: null
    currency: string
    accepts_marketing_updated_at: string
    marketing_opt_in_level: string
    sms_marketing_consent: null
    admin_graphql_api_id: string
    default_address: {
      id: number
      customer_id: number
      first_name: string
      last_name: string
      company: string
      address1: string
      address2: string
      city: string
      province: null
      country: string
      zip: string
      phone: string
      name: string
      province_code: null
      country_code: string
      country_name: string
      default: true
    }
  }
  discount_applications: []
  fulfillments: []
  line_items: [
    {
      id: number
      admin_graphql_api_id: string
      destination_location: [object]
      fulfillable_quantity: 0
      fulfillment_service: string
      fulfillment_status: null
      gift_card: false
      grams: 0
      name: string
      origin_location: [object]
      price: string
      price_set: [object]
      product_exists: true
      product_id: number
      properties: []
      quantity: 1
      requires_shipping: true
      sku: string
      taxable: true
      title: string
      total_discount: string
      total_discount_set: [object]
      variant_id: number
      variant_inventory_management: null
      variant_title: string
      vendor: string
      tax_lines: []
      duties: []
      discount_allocations: []
    }
  ]
  payment_details: {
    credit_card_bin: string
    avs_result_code: null
    cvv_result_code: null
    credit_card_number: string
    credit_card_company: string
  }
  payment_terms: null
  refunds: [
    {
      id: number
      admin_graphql_api_id: string
      created_at: string
      note: null
      order_id: number
      processed_at: string
      restock: true
      total_duties_set: [object]
      user_id: number
      order_adjustments: []
      transactions: []
      refund_line_items: []
      duties: []
    }
  ]
  shipping_address: {
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
  shipping_lines: [
    {
      id: number
      carrier_identifier: null
      code: string
      delivery_category: null
      discounted_price: string
      discounted_price_set: [object]
      phone: string
      price: string
      price_set: [object]
      requested_fulfillment_service_id: null
      source: string
      title: string
      tax_lines: []
      discount_allocations: []
    }
  ]
}

export default Cancellation
