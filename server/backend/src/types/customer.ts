type Customer = {
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

export default Customer
