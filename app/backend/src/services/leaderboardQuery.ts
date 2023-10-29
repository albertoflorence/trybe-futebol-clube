export default `
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
  ((r.totalVictories * 3 + r.totalDraws) / (r.totalGames * 3)) * 100 AS efficiency
FROM
  (
    SELECT
      t.team_name AS name,
      COUNT(*) AS totalGames,
      SUM(m.home_team_goals) as goalsFavor,
      SUM(m.away_team_goals) as goalsOwn,
      (SUM(m.home_team_goals) - SUM(m.away_team_goals)) as goalsBalance,
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
      matches as m
      JOIN teams t ON m.home_team_id = t.id
    WHERE
      in_progress = false
    GROUP BY
      name
  ) AS r
  ORDER BY
    totalPoints DESC,
    goalsBalance DESC,
    goalsFavor DESC
  `;
