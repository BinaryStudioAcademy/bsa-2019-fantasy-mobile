import { API_URL } from './webApiHelper';

export const getPlayerImageUrl = (code: number, size: 220 | 500) => {
  if (!code) return '';
  if (size === 220) return `${API_URL}/images/players/220x280/${code}.png`;
  if (size === 500) return `${API_URL}/images/players/500x500/${code}.png`;
  return '';
};
