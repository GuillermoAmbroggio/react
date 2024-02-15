import { FixtureAttributes } from './fixture.types';
import { PredictionAttributes } from './prediction.types';
import { UserAttributes } from './user.types';

export type PaymentStatusProps = 'approved' | 'pending' | 'failure';
export type PaymentMethodProps =
  | 'mp'
  | 'test'
  | 'paypal'
  | 'binance'
  | 'transfer';

export interface TicketAttributes {
  id?: number;
  fixtureId?: number;
  userId?: number;
  paymentStatus: PaymentStatusProps;
  paymentMethod: PaymentMethodProps;
  paymentId?: string;
  resultPoints?: number;
  predictions?: PredictionAttributes[];
  fixture?: FixtureAttributes;
  user?: UserAttributes; // Llega enctriptado como string -> UserAttributes;
}

export type TicketQueryParams = {
  page?: string;
  resultsPerPage?: string;
  searchText?: string;
  fixtureId?: string;
};

export interface ResponsePaginatedTickets {
  count: number;
  next: string | null;
  previous: string | null;
  results: TicketAttributes[];
}

export type ResponsePredictions = {
  matchId: number;
  status: 'success' | 'error';
  message: string;
};

export interface ResponseTicketCreate extends TicketAttributes {
  infoPredictions: ResponsePredictions[];
}

export const paymentStatusTicket: { [key in PaymentStatusProps]: string } = {
  approved: 'Aprobado',
  failure: 'Cancelado',
  pending: 'Pendiente',
};

export const paymentMethodTicket: { [key in PaymentMethodProps]: string } = {
  test: 'Test',
  mp: 'Mercado pago',
  paypal: 'Paypal',
  binance: 'Binance',
  transfer: 'Transferencia',
};

export type BodyTicket = {
  paymentMethod: PaymentMethodProps;
  paymentId?: string;
  fixtureId?: number;
  predictions: PredictionAttributes[];
  createTicketSecret: string;
};
