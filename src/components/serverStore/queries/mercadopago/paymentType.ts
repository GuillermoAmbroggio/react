export type ResponsePaymentMp = {
  accounts_info: null | any;
  acquirer_reconciliation: any[];
  additional_info: {
    authentication_code: null | any;
    available_balance: null | any;
    ip_address: string;
    items: {
      category_id: string;
      description: string;
      id: string;
      picture_url: string;
      quantity: string;
      title: string;
      unit_price: string;
    }[];
    nsu_processadora: null | any;
  };
  authorization_code: null | any;
  binary_mode: boolean;
  brand_id: null | any;
  build_version: string;
  call_for_authorize_id: null | any;
  captured: boolean;
  card: Record<string, any>;
  charges_details: {
    accounts: {
      from: string;
      to: string;
    };
    amounts: {
      original: number;
      refunded: number;
    };
    client_id: number;
    date_created: string;
    id: string;
    last_updated: string;
    metadata: Record<string, any>;
    name: string;
    refund_charges: any[];
    reserve_id: null | any;
    type: string;
  }[];
  collector_id: number;
  corporation_id: null | any;
  counter_currency: null | any;
  coupon_amount: number;
  currency_id: string;
  date_approved: string;
  date_created: string;
  date_last_updated: string;
  date_of_expiration: null | any;
  deduction_schema: null | any;
  description: string;
  differential_pricing_id: null | any;
  external_reference: string;
  fee_details: {
    amount: number;
    fee_payer: string;
    type: string;
  }[];
  financing_group: null | any;
  id: number;
  installments: number;
  integrator_id: null | any;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner: null | any;
  merchant_account_id: null | any;
  merchant_number: null | any;
  metadata: Record<string, any>;
  money_release_date: string;
  money_release_schema: null | any;
  money_release_status: string;
  notification_url: string;
  operation_type: string;
  order: {
    id: string;
    type: string;
  };
  payer: {
    identification: {
      number: string;
      type: string;
    };
    entity_type: null | any;
    phone: {
      number: string | null;
      extension: string | null;
      area_code: string | null;
    };
    last_name: string | null;
    id: string;
    type: string | null;
    first_name: string | null;
    email: string;
  };
  payment_method: {
    id: string;
    issuer_id: string;
    type: string;
  };
  payment_method_id: string;
  payment_type_id: string;
  platform_id: null | any;
  point_of_interaction: {
    business_info: {
      sub_unit: string;
      unit: string;
    };
    transaction_data: {
      e2e_id: string | null;
    };
    type: string;
  };
  pos_id: null | any;
  processing_mode: string;
  refunds: any[];
  shipping_amount: number;
  sponsor_id: null | any;
  statement_descriptor: null | any;
  status: string;
  status_detail: string;
  store_id: null | any;
  tags: null | any;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: {
    acquirer_reference: null | any;
    external_resource_url: string | null;
    financial_institution: string | null;
    installment_amount: number;
    net_received_amount: number;
    overpaid_amount: number;
    payable_deferral_period: string | null;
    payment_method_reference_id: string | null;
    total_paid_amount: number;
  };
};
