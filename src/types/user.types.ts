import { TicketAttributes } from './ticket.types';

export type IAuth = {
  csrfToken: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  password: string;
  confirmPassword: string;
  token: string;
};

export type UserTypeProps = 'free' | 'premium' | 'administrator' | 'developer';

export interface UserAttributes {
  id?: string;
  email: string;
  userType: UserTypeProps;
  name: string;
  lastname: string;
  alias?: string;
  phone?: string;
  country?: string;
  birthdate?: string;
  tickets?: TicketAttributes[];
  hasPassword?: boolean;
}

export type UserResponseApi = string;

export interface ResponsePaginatedUsers {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserAttributes[];
}

export type GetPaginatedQueryParams = {
  page?: string;
  resultsPerPage?: string;
  searchText?: string;
  tournamentId?: string;
  include?: 'teams';
};
