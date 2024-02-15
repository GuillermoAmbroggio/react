import { MatchAttributes } from './match.types';
import { TicketAttributes } from './ticket.types';
import { TournamentAttributes } from './tournament.types';

export type StatusFixture = 'inProgress' | 'finished' | 'toStart' | 'created';

export type TopTickets = {
  [key in 1 | 2 | 3]: number[];
};
export interface FixtureAttributes {
  id?: number;
  tournamentId: number;
  name: string;
  startDate: Date;
  finishDate: Date;
  status: StatusFixture;
  matches?: MatchAttributes[];
  tickets?: TicketAttributes[];
  tournament: TournamentAttributes;
  price?: number;
  totalTickets?: number;
  topTickets?: TopTickets;
}

export interface ResponsePaginatedFixtures {
  count: number;
  next: string | null;
  previous: string | null;
  results: FixtureAttributes[];
}

export const statusFixture: { [key in StatusFixture]: string } = {
  inProgress: 'En curso',
  toStart: 'Por iniciar',
  finished: 'Finalizado',
  created: 'Creado',
};
