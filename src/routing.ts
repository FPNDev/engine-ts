import { setupRouter } from "./local_modules/router/setup";
import { Start } from "./page/Start/Start";

const routes = [
  {
    path: "/",
    component: Start,
  },
];

const router = setupRouter(
  document.querySelector<HTMLButtonElement>("#app")!,
  routes
);

export { router };
