export type InfoWinner = {
  email: string;
  ticketId: number;
  userName: string;
};

export type WinnersData = {
  fixture: { fixtureId: number; fixtureName: string; resultPoints: number };
  torunament: { tournamentId: number; tournamentName: string };
  info: InfoWinner[];
  prize: number;
  nextFixtureName: string;
};

const winners: WinnersData[] = [
  {
    torunament: { tournamentId: 1, tournamentName: 'Liga Argentina' },
    fixture: { fixtureId: 4, fixtureName: 'fecha 4', resultPoints: 10 },
    nextFixtureName: 'fecha 5',
    info: [
      {
        ticketId: 34,
        email: 'manugimz24@gmail.com',
        userName: 'Manuel Gimz',
      },
      {
        ticketId: 35,
        email: 'diegocarp94@gmail.com',
        userName: 'DIEGO SOSA',
      },
    ],
    prize: 2970,
  },
];

export default winners;
