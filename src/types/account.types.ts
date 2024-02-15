export type BalancesProps = {
  asset: string; // 'BTC';
  free: string; // '4723846.89208129';
  locked: string; // '0.00000000';
};

export type ResponseAccountProps = {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  commissionRates: {
    maker: string; // '0.00150000';
    taker: string; // '0.00150000';
    buyer: string; // '0.00000000';
    seller: string; //'0.00000000';
  };
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  brokered: boolean;
  requireSelfTradePrevention: boolean;
  updateTime: number;
  accountType: 'SPOT';
  balances: BalancesProps[];
  permissions: ['SPOT'];
};
