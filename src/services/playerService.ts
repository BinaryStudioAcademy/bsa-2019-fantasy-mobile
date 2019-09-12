import callWebApi from 'src/helpers/webApiHelper';
import { PlayerType } from 'src/types/player.types';

export const getPlayers = async (
  filter: any = {},
): Promise<{ count: number; rows: PlayerType[] }> => {
  const response = await callWebApi({
    endpoint: `/api/players`,
    type: 'GET',
    query: filter,
  });

  return response.json();
};

export const getPlayerById = async (id: string): Promise<PlayerType> => {
  const response = await callWebApi({
    endpoint: `/api/players/${id}`,
    type: 'GET',
  });

  return response.json();
};
