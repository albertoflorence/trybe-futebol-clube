const query = `
SELECT
  r.name,
  r.totalGames,
  r.totalVictories,
  r.totalDraws,
  r.totalLosses,
  r.goalsFavor,
  r.goalsOwn,
  (r.totalVictories * 3 + r.totalDraws) AS totalPoints,
  (r.goalsFavor - r.goalsOwn) AS goalsBalance,
  (
    (r.totalVictories * 3 + r.totalDraws) / (r.totalGames * 3)
  ) * 100 AS efficiency
FROM
  (
    SELECT
      t.team_name AS name,
      COUNT(*) AS totalGames,
      SUM(m.home_team_goals) as goalsFavor,
      SUM(m.away_team_goals) as goalsOwn,
      SUM(
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalVictories,
      SUM(
        CASE
          WHEN m.home_team_goals = m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalDraws,
      SUM(
        CASE
          WHEN m.home_team_goals < m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalLosses
    FROM
      matches m
      JOIN teams t ON m.home_team_id = t.id
      WHERE m.in_progress = false
    GROUP BY
      name
  ) AS r
ORDER BY
  totalPoints DESC,
  goalsBalance DESC,
  goalsFavor DESC
`;

const all = `(
  SELECT
    home_team_id,
    home_team_goals,
    away_team_goals
  FROM
    matches
  WHERE
    in_progress = false
  UNION ALL
  SELECT
    away_team_id AS home_team_id,
    away_team_goals AS home_team_goals,
    home_team_goals AS away_team_goals
  FROM
    matches
  WHERE
    in_progress = false
) as m`;

type homeOrAway = 'all' | 'home' | 'away';

export default function createQuery(type: homeOrAway) {
  switch (type) {
    case 'home': return query;
    case 'all': return query.replace('WHERE m.in_progress = false', '').replace('matches m', all);
    case 'away': return query.replace(/(home)|(away)/g, (_, group) => (group ? 'away' : 'home'));

    default: return query;
  }
}

console.log(createQuery('all'));
