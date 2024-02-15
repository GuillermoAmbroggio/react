import { MatchAttributes } from './match.types';
import { TicketAttributes } from './ticket.types';

export interface PredictionAttributes {
  id?: number;
  matchId?: number;
  ticketId?: number;
  predictionLocalTeam?: number;
  predictionVisitingTeam?: number;
  resultPoints?: number;
  match?: MatchAttributes;
  ticket?: TicketAttributes;
}
