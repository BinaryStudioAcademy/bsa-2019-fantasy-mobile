export type PlayersSorting = {
  order: 'ASC' | 'DESC';
  sortBy: 'name' | 'player_score' | 'player_price';
};

export type PlayersCount = {
  offset: number;
  count: number;
};

export type PlayersFilter = PlayersSorting & PlayersCount;
