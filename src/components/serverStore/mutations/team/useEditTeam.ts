import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ResponsePaginatedTeams,
  TeamAttributes,
} from '../../../../types/team.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { body: TeamAttributes; teamId: number };
type PutEditTeamProps = (params: {
  body: TeamAttributes;
  teamId: number;
}) => Promise<any>;

const putEditTeam: PutEditTeamProps = async (params) => {
  return await axiosFetch(`/team/${params.teamId}`, {
    method: 'PUT',
    data: params.body,
  }).then((response) => {
    return response;
  });
};

const useEditTeam: (
  teamId?: number,
) => UseMutationResult<TeamAttributes, any, Params, unknown> = (
  teamId?: number,
) => {
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: putEditTeam,
    onSuccess: async (teamEdited) => {
      const teamsCache = serverStore.getQueryData(['teams']) as
        | ResponsePaginatedTeams
        | undefined;

      if (teamsCache && teamsCache.results.length) {
        const teams = teamsCache.results;
        const userEditIndex = teams.findIndex((team) => team.id === teamId);
        if (userEditIndex !== -1) {
          teams[userEditIndex] = teamEdited;
        }
        serverStore.setQueryData(['teams'], { ...teamsCache, results: teams });
      }

      serverStore.invalidateQueries({ queryKey: [`team-${teamId ?? ''}`] });
    },
  });
};

export default useEditTeam;
