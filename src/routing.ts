import { Route } from './local_modules/router/interface/route';
import { setupRouter } from './local_modules/router/setup';
import { Landing } from './page/guest/Landing/Landing';

const HomeRoute = {
  path: '/',
  component: Landing,
};

const routes: Route[] = [
  // Starting page
  HomeRoute, // alias: /
  { ...HomeRoute, path: '/home' }, // alias: /home
] as const;

const router = setupRouter(
  document.querySelector<HTMLButtonElement>('#app')!,
  routes
);

export { router, routes };
