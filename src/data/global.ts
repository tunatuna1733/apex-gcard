export const trackerKeys = [
  'damage_done',
  'executions',
  'games_played',
  'headshots',
  'kills',
  'kills_while_killleader',
  'placements_top_3',
  'placements_win_with_squad_alive',
  'revived_ally',
  'placements_win',
  'winning_kills',
  'assists',
] as const;

export type TrackerKeyType = (typeof trackerKeys)[number];

export const trackerData: Record<TrackerKeyType, string> = {
  damage_done: 'Damage',
  executions: 'Finishers',
  games_played: 'Games Played',
  headshots: 'Headshots',
  kills: 'Kills',
  kills_while_killleader: 'Kills as Kill Leader',
  placements_top_3: 'Times Placed Top 3',
  placements_win_with_squad_alive: 'Wins with Full Squad Alive',
  revived_ally: 'Revives',
  placements_win: 'Wins',
  winning_kills: 'Winning Kills',
  assists: 'Assists',
};
