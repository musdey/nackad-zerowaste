export type Subscription = {
  address_id: number
  analytics_data: {
    utm_params: string[]
  }
  cancellation_reason: string
  cancellation_reason_comments: string
  cancelled_at: string
  charge_interval_frequency: string //21
  charge_interval_unit_type: string //day
  created_at: string //'2022-05-09T15:27:19'
  customer_id: number // 86799371
  email: string // 'mustafa.cicek@live.at'
  expire_after_specific_number_of_charges: number // 1
  has_queued_charges: number // 0
  id: number // 242297715
  is_prepaid: boolean // false
  is_skippable: boolean // true
  is_swappable: boolean // false
  max_retries_reached: number // 0
  next_charge_scheduled_at: string // null
  order_day_of_month: string // null
  order_day_of_week: string // null
  order_interval_frequency: string // '21'
  order_interval_unit: string // 'day'
  presentment_currency: string // 'EUR'
  price: number // 20.61
  product_title: string // 'Pfand'
  properties: any[]
  quantity: number // 1
  recharge_product_id: number //2443879
  shopify_product_id: number //7624895987959
  shopify_variant_id: number //42761313222903
  sku: any // null
  sku_override: boolean // false
  status: string //  'ACTIVE'
  updated_at: string // '2022-05-09T16:09:24'
  variant_title: string // ''
}

export type Charge = {
  id: 100714428
  address_id: 21317826
  analytics_data: {
    utm_params: [
      {
        utm_campaign: 'spring_sale'
        utm_content: 'differentiate-content'
        utm_data_source: 'cookie'
        utm_medium: 'email'
        utm_source: 'newsletter'
        utm_term: 'test-term'
        utm_time_stamp: '2019-12-16T23:57:28.752Z'
      }
    ]
  }
  billing_address: {
    address1: '3030 Nebraska Avenue'
    address2: null
    city: 'Los Angeles'
    company: null
    country_code: 'US'
    first_name: 'Mike'
    last_name: 'Flynn'
    phone: '3103843698'
    province: 'California'
    zip: '90404'
  }
  client_details: {
    browser_ip: '192.168.0.1'
    user_agent: 'safari webkit'
  }
  created_at: '2018-11-14T09:45:44'
  currency: 'USD'
  // customer_id: {
  //   id: number
  //   email: 'test@test.com'
  //   external_customer_id: {
  //     ecommerce: '2879413682227'
  //   }
  //   hash: '7e706455cbd13e40'
  // }
  customer_id: number
  discounts: [
    {
      id: 12345
      code: '10DOLLAROFF'
      value: 10
      value_type: 'fixed_amount'
    }
  ]
  error: null
  error_type: null
  external_order_id: {
    ecommerce: '2541635698739'
  }
  external_transaction_id: {
    payment_processor: 'ch_XXXXXXXXXXXXXXX'
  }
  has_uncommitted_changes: false
  line_items: [
    {
      purchase_item_id: 63898947
      external_product_id: {
        ecommerce: '4381728735283'
      }
      external_variant_id: {
        ecommerce: '99999999999'
      }
      grams: 4536
      images: {
        large: 'https://cdn.shopify.com/s/files/1/0175/0695/9460/products/Sumatra_Coffee_large.png'
        medium: 'https://cdn.shopify.com/s/files/1/0175/0695/9460/products/Sumatra_Coffee__medium.png'
        original: 'https://cdn.shopify.com/s/files/1/0175/0695/9460/products/Sumatra_Coffee_.png'
        small: 'https://cdn.shopify.com/s/files/1/0175/0695/9460/products/Sumatra_Coffee__small.png'
      }
      properties: [
        {
          name: 'grind'
          value: 'drip'
        }
      ]
      purchase_item_type: 'subscription'
      quantity: 1
      tax_due: '10.00'
      tax_lines: [
        {
          price: '0.950'
          rate: 0.0725
          title: 'CA State Tax'
        }
      ]
      taxable: true
      taxable_amount: '12'
      sku: 'MILK-1'
      title: 'Sumatra Coffee'
      variant_title: 'Milk - a / b'
    }
  ]
  note: 'next order #1'
  order_attributes: [
    {
      name: 'custom name'
      value: 'custom value'
    }
  ]
  processor_name: 'stripe'
  scheduled_at: '2018-12-12T00:00:00'
  shipping_address: {
    address1: '3030 Nebraska Avenue'
    address2: ''
    city: 'Los Angeles'
    company: 'Recharge'
    country: 'United States'
    first_name: 'Mike'
    last_name: 'Flynn'
    phone: '3103843698'
    province: 'California'
    zip: '90404'
  }
  shipping_lines: [
    {
      code: 'Standard Shipping'
      price: '0.00'
      title: 'Standard Shipping'
    }
  ]
  status:
    | 'success'
    | 'error'
    | 'queued'
    | 'skipped'
    | 'refunded'
    | 'partially_refunded'
    | 'pending_manual_payment'
    | 'pending'
  subtotal_price: '12.00'
  tags: 'Subscription'
  tax_lines: [
    {
      price: '0.950'
      rate: 0.0725
      title: 'CA State Tax'
    },
    {
      price: '0.335'
      rate: 0.0225
      title: 'Los Angeles  County Tax'
    }
  ]
  total_discounts: '0.00'
  total_line_items_price: '12.00'
  total_price: '12.00'
  total_refunds: null
  total_tax: '0.00'
  total_weight_grams: 4536
  type: 'recurring' | 'checkout'
  updated_at: '2018-11-14T09:45:44'
}

export type Webhook = {
  address: string
  id: number
  included_objects: any[]
  topic: string
  version: string
}
export type WebhookCallResult = {
  webhooks: Webhook[]
}
