import { MatchAttributes } from './match.types';

export interface TeamAttributes {
  id?: number;
  name: string;
  country: string;
  continent: string;
  image?: string;
  matches?: MatchAttributes[];
}

export interface ResponsePaginatedTeams {
  count: number;
  next: string | null;
  previous: string | null;
  results: TeamAttributes[];
}
