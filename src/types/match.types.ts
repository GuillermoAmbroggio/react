import { FixtureAttributes } from './fixture.types';
import { TeamAttributes } from './team.types';

export type SatatusMatch =
  | 'inProgress'
  | 'toStart'
  | 'cancelled'
  | 'postponed'
  | 'finished';

export interface MatchAttributes {
  id: number;
  fixtureId?: number;
  localTeamId?: number;
  visitingTeamId?: number;
  resultLocalTeam?: number;
  resultVisitingTeam?: number;
  stadium?: string;
  startDate?: Date;
  status: SatatusMatch;
  fixture?: FixtureAttributes;
  localTeam?: TeamAttributes;
  visitingTeam?: TeamAttributes;
}

export interface ResponsePaginatedMatches {
  count: number;
  next: string | null;
  previous: string | null;
  results: MatchAttributes[];
}

export const statusMatch: { [key: string]: string } = {
  inProgress: 'En curso',
  toStart: 'Por iniciar',
  finished: 'Finalizado',
  cancelled: 'Cancelado',
  postponed: 'Suspendido',
};
