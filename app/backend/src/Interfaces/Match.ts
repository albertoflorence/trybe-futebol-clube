export default interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchCreate = Omit<Match, 'id' | 'inProgress'>;
