import { FixtureAttributes, StatusFixture } from './fixture.types';

export type StatusTournament =
  | 'inProgress'
  | 'finished'
  | 'toStart'
  | 'created';

export type CountriesTournament = 'argentina' | 'international';

export interface TournamentAttributes {
  id?: number;
  name: string;
  startDate: Date;
  finishDate?: Date;
  country: CountriesTournament;
  continent: string;
  status: StatusTournament;
  fixture?: FixtureAttributes[];
  totalTourmanets?: number;
}

export interface TournamentWithFixtureName
  extends Omit<TournamentAttributes, 'fixture'> {
  fixture?: {
    name: string;
    id: number;
    status: StatusFixture;
  }[];
}

export interface ResponsePaginatedTournaments {
  count: number;
  next: string | null;
  previous: string | null;
  results: TournamentAttributes[];
}

export const statusTournaments: { [key in StatusTournament]: string } = {
  inProgress: 'En curso',
  toStart: 'Por iniciar',
  finished: 'Finalizado',
  created: 'Creado',
};

export const countriesTournaments: { [key in CountriesTournament]: string } = {
  argentina: 'Argentina (ARS)',
  international: 'Internacional (USD)',
};
