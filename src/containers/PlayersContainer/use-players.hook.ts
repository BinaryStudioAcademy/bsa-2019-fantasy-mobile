import { useState, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { RootState } from 'src/store/types';
import { PlayersSorting } from './types';

export const usePlayers = () => {
  const { items: players, loading, error } = useSelector(
    (state: RootState) => state.players,
    shallowEqual,
  );

  const [sorting, setSorting] = useState<PlayersSorting>({
    order: 'DESC',
    sortBy: 'player_score',
  });

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(10);

  const orderedPlayers = useMemo(() => {
    if (!players || players.length === 0) {
      return [];
    }

    setOffset(0);

    const newPlayers = [...players];

    const { order, sortBy } = sorting;

    if (sortBy === 'name') {
      newPlayers.sort((a, b) => (a.second_name > b.second_name ? -1 : 1));
    } else if (sortBy === 'player_price' || sortBy === 'player_score') {
      newPlayers.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    if (order === 'DESC') {
      newPlayers.reverse();
    }

    return newPlayers;
  }, [players, sorting]);

  const playersToShow = useMemo(
    () => orderedPlayers.slice(offset, offset + count + 1),

    [orderedPlayers, offset, count],
  );

  const playerOfTheWeek = useMemo(() => {
    if (sorting.sortBy === 'player_score' && sorting.order === 'DESC') {
      return orderedPlayers[0];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedPlayers.length]);

  const nextPage = () => {
    if (offset < Math.floor(orderedPlayers.length / count) * count) {
      setOffset((o) => o + count);
    }
  };

  const prevPage = () => {
    if (offset >= count) {
      setOffset((o) => o - count);
    }
  };

  const changeSorting = (by: typeof sorting.sortBy) => {
    if (sorting.sortBy === by) {
      return setSorting((v) => ({ ...v, order: v.order === 'ASC' ? 'DESC' : 'ASC' }));
    } else {
      setSorting({ sortBy: by, order: 'DESC' });
    }
  };

  const pagination = useMemo(() => {
    const amount = Math.ceil(players.length / count);
    const current = Math.floor(offset / count) + 1;

    return {
      current,
      amount,
    };
  }, [players.length, count, offset]);

  return {
    players: playersToShow,
    loading,
    error,
    playerOfTheWeek,

    sorting,
    changeSorting,

    pagination,

    nextPage,
    prevPage,
  };
};
