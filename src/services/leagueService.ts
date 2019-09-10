import callWebApi from '../helpers/webApiHelper';

export const getUserLeagues = async (id: any) => {
  const response = await callWebApi({
    endpoint: `/api/profile/leagues/mobile/${id}`,
    type: 'GET',
  });

  return response.json();
};

export const getLeagueDetails = async (name: string) => {
  const response = await callWebApi({
    endpoint: `/api/leagues/${name}`,
    type: 'GET',
  });

  return response.json();
};
