import { RouteKey } from "../enums";

export const ClientAPIRoutes = {
  /**
   * Login
   */
  LOGIN: {
    baseRoute: () => "/api/login",
  },
};

export const ClientRoutes: Record<RouteKey, string> = {
  [RouteKey.HOME]: "/home",
  [RouteKey.LOGIN]: "/login",
};
