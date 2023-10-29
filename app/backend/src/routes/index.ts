import teamsRoute from './teams.route';
import authRoute from './auth.route';
import matchesRoute from './matches.route';
import leaderboardRoute from './leaderboard.route';

export default [
  { route: '/teams', router: teamsRoute },
  { route: '/login', router: authRoute },
  { route: '/matches', router: matchesRoute },
  { route: '/leaderboard', router: leaderboardRoute },
];
