import callWebApi from '../helpers/webApiHelper';

export const getUserLeagues = async (id) => {
  const response = await callWebApi({
    endpoint: `/api/profile/leagues/${id}`,
    type: 'GET',
  });

  return response.json();
};
