import teamsRoute from './teams.route';
import authRoute from './auth.route';

export default [
  { route: '/teams', router: teamsRoute },
  { route: '/login', router: authRoute },
];
