import { Position } from '../types/player.types.ts';

export const categorizePlayers = givenPlayers => {
	const players = givenPlayers || [];

	return {
		GKP: players.filter(
			p => p.player_stats.position === Position.GKP,
		),
		DEF: players.filter(p => p.player_stats.position === Position.DEF),
		MID: players.filter(
			p => p.player_stats.position === Position.MID,
		),
		FWD: players.filter(p => p.player_stats.position === Position.FWD),
	};
};