import { useQuery } from '@tanstack/react-query';
import { FixtureAttributes } from '../../../../types/fixture.types';
import { TicketAttributes } from '../../../../types/ticket.types';
import { UserAttributes } from '../../../../types/user.types';
import { decryptData } from '../../../../utils';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { fixtureId?: number; tournamentId?: number };

const getFixture = async (params: Params): Promise<FixtureAttributes> => {
  const { fixtureId, tournamentId } = params;
  const response: FixtureAttributes = await axiosFetch(
    `/fixture/id/${fixtureId || ''}?include=teams&include=tickets${
      tournamentId ? `&tournamentId=${tournamentId}` : ''
    }`,
  );

  const decryptedUserTickets: TicketAttributes[] | undefined =
    response?.tickets?.map((t) => ({
      ...t,
      user: t.user ? (decryptData(t.user) as UserAttributes) : undefined,
    }));
  return { ...response, tickets: decryptedUserTickets };
};

export default function useGetFixture(params: Params) {
  return useQuery({
    queryKey: [`fixture-${params?.fixtureId || 'last'}`],
    queryFn: () => getFixture(params),
  });
}
