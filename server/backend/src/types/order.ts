type Order = {
  deliveryDay?: Date
  timeslot?: string
  id?: number
  email?: string
  closed_at?: string | null
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
  cart_token?: string | null
  buyer_accepts_marketing?: boolean
  name?: string
  referring_site?: string
  landing_site?: string
  cancelled_at?: string | null
  cancel_reason?: string | null
  total_price_usd?: string
  checkout_token?: string
  reference?: string | null
  user_id?: string | null
  location_id?: string | null
  source_identifier?: string | null
  source_url?: string | null
  processed_at?: string
  device_id?: string | null
  phone?: string | null
  customer_locale?: string
  app_id?: number
  browser_ip?: string
  landing_site_ref?: string | null
  order_number?: number
  discount_applications?: {
    type?: string
    value?: string
    value_type?: string
    allocation_method?: string
    target_selection?: string
    target_type?: string
    description?: string
    title?: string
    code?: string
  }[]
  discount_codes?: { code?: string; amount?: string; type?: string }[]
  note_attributes?: { name: string; value: string }[]
  payment_gateway_names?: string[]
  processing_method?: string
  checkout_id?: number
  source_name?: string
  fulfillment_status?: string | null
  tax_lines?: {
    price?: string
    rate?: number
    title?: string
    price_set?: any[]
    channel_liable?: boolean
  }[]
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
  line_items?: {
    deposit: {
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
  }[]
  fulfillments?: any[]
  refunds?: any[]
  total_tip_received?: string
  original_total_duties_set?: string | null
  current_total_duties_set?: string | null
  payment_terms?: string | null
  admin_graphql_api_id?: string
  shipping_lines?: {
    id?: number
    title?: string
    price?: string
    code?: string
    source?: string
    phone?: string | null
    requested_fulfillment_service_id?: string | null
    delivery_category?: string | null
    carrier_identifier?: string | null
    discounted_price?: string
    price_set?: any
    discounted_price_set?: any
    discount_allocations?: any[]
    tax_lines?: any[]
  }[]
  billing_address?: {
    first_name?: string
    address1?: string
    phone?: string
    city?: string
    zip?: string
    province?: string | null
    country?: string
    last_name?: string
    address2?: string
    company?: string
    latitude?: number | null
    longitude?: number | null
    name?: string
    country_code?: string
    province_code?: string | null
  }
  shipping_address?: {
    first_name?: string
    address1?: string
    phone?: string
    city?: string
    zip?: string
    province?: string | null
    country?: string
    last_name?: string
    address2?: string
    company?: string
    latitude?: string | null
    longitude?: string | null
    name?: string
    country_code?: string
    province_code?: string | null
  }
  customer?: {
    id?: number
    email?: string
    accepts_marketing?: boolean
    created_at?: string
    updated_at?: string
    first_name?: string
    last_name?: string
    orders_count?: number
    state?: string
    total_spent?: string
    last_order_id?: number | null
    note?: string | null
    verified_email?: boolean
    multipass_identifier?: string | null
    tax_exempt?: boolean
    phone?: string | null
    tags?: string
    last_order_name?: string | null
    currency?: string
    accepts_marketing_updated_at?: string
    marketing_opt_in_level?: string
    sms_marketing_consent?: string | null
    admin_graphql_api_id?: string
    default_address?: {
      id?: number
      customer_id?: number
      first_name?: string
      last_name?: string
      company?: string
      address1?: string
      address2?: string
      city?: string
      province?: string | null
      country?: string
      zip?: string
      phone?: string
      name?: string
      province_code?: string | null
      country_code?: string
      country_name?: string
      default?: boolean
    }
  }
}

export default Order
