type Order = {
  id?: string
  email?: string
  closed_at?: string
  created_at?: string
  updated_at?: string
  number?: number
  note?: string
  token?: string
  gateway?: string
  test?: boolean
  total_price?: string
  subtotal_price?: string
  total_weight?: number
  total_tax?: string
  taxes_included?: boolean
  currency?: string
  financial_status?: string
  confirmed?: boolean
  total_discounts?: string
  total_line_items_price?: string
  cart_token?: string
  buyer_accepts_marketing?: boolean
  name?: string
  referring_site?: string
  landing_site?: string
  cancelled_at?: string
  cancel_reason?: string
  total_price_usd?: string
  checkout_token?: string
  reference?: string
  user_id?: string
  location_id?: string
  source_identifier?: string
  source_url?: string
  processed_at?: string
  device_id?: string
  phone?: string
  customer_locale?: string
  app_id?: string
  browser_ip?: string
  landing_site_ref?: string
  order_number?: string
  discount_applications?: [
    {
      type?: string
      value?: string
      value_type?: string
      allocation_method?: string
      target_selection?: string
      target_type?: string
      description?: string
      title?: string
    }
  ]
  discount_codes?: []
  note_attributes?: []
  payment_gateway_names?: [string]
  processing_method?: string
  checkout_id?: string
  source_name?: string
  fulfillment_status?: string
  tax_lines?: []
  tags?: string
  contact_email?: string
  order_status_url?: string
  presentment_currency?: string
  total_line_items_price_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  total_discounts_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  total_shipping_price_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  subtotal_price_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  total_price_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  total_tax_set?: {
    shop_money?: { amount?: string; currency_code?: string }
    presentment_money?: { amount?: string; currency_code?: string }
  }
  line_items?: [
    {
      id?: string
      variant_id?: string
      title?: string
      quantity?: 1
      sku?: string
      variant_title?: string
      vendor?: string
      fulfillment_service?: string
      product_id?: string
      requires_shipping?: boolean
      taxable?: boolean
      gift_card?: boolean
      name?: string
      variant_inventory_management?: string
      properties?: []
      product_exists?: boolean
      fulfillable_quantity?: 1
      grams?: 0
      price?: string
      total_discount?: string
      fulfillment_status?: string
      price_set?: [object]
      total_discount_set?: [object]
      discount_allocations?: []
      duties?: []
      admin_graphql_api_id?: string
      tax_lines?: []
    },
    {
      id?: string
      variant_id?: string
      title?: string
      quantity?: number
      sku?: string
      variant_title?: string
      vendor?: string
      fulfillment_service?: string
      product_id?: 7470591738103
      requires_shipping?: boolean
      taxable?: boolean
      gift_card?: boolean
      name?: string
      variant_inventory_management?: string
      properties?: []
      product_exists?: boolean
      fulfillable_quantity?: number
      grams?: 0
      price?: string
      total_discount?: string
      fulfillment_status?: string
      price_set?: [object]
      total_discount_set?: [object]
      discount_allocations?: []
      duties?: []
      admin_graphql_api_id?: string
      tax_lines?: []
    }
  ]
  fulfillments?: []
  refunds?: []
  total_tip_received?: string
  original_total_duties_set?: string
  current_total_duties_set?: string
  payment_terms?: string
  admin_graphql_api_id?: string
  shipping_lines?: [
    {
      id?: string
      title?: string
      price?: string
      code?: string
      source?: string
      phone?: string
      requested_fulfillment_service_id?: string
      delivery_category?: string
      carrier_identifier?: string
      discounted_price?: string
      price_set?: [object]
      discounted_price_set?: [object]
      discount_allocations?: []
      tax_lines?: []
    }
  ]
  billing_address?: {
    first_name?: string
    address1?: string
    phone?: string
    city?: string
    zip?: string
    province?: string
    country?: string
    last_name?: string
    address2?: string
    company?: string
    latitude?: string
    longitude?: string
    name?: string
    country_code?: string
    province_code?: string
  }
  shipping_address?: {
    first_name?: string
    address1?: string
    phone?: string
    city?: string
    zip?: string
    province?: string
    country?: string
    last_name?: string
    address2?: string
    company?: string
    latitude?: string
    longitude?: string
    name?: string
    country_code?: string
    province_code?: string
  }
  customer?: {
    id?: string
    email?: string
    accepts_marketing?: boolean
    created_at?: string
    updated_at?: string
    first_name?: string
    last_name?: string
    orders_count?: number
    state?: string
    total_spent?: string
    last_order_id?: string
    note?: string
    verified_email?: boolean
    multipass_identifier?: string
    tax_exempt?: boolean
    phone?: string
    tags?: string
    last_order_name?: string
    currency?: string
    accepts_marketing_updated_at?: string
    marketing_opt_in_level?: string
    sms_marketing_consent?: string
    admin_graphql_api_id?: string
    default_address?: {
      id?: string
      customer_id?: string
      first_name?: string
      last_name?: string
      company?: string
      address1?: string
      address2?: string
      city?: string
      province?: string
      country?: string
      zip?: string
      phone?: string
      name?: string
      province_code?: string
      country_code?: string
      country_name?: string
      default?: boolean
    }
  }
}

export default Order
