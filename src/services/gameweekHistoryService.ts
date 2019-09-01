import callWebApi from '../helpers/webApiHelper';

export const getGameweeksHistoryByUser = async (userId: string) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}`,
    type: 'GET',
  });
  return response.json();
};
