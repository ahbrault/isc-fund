export type RouteType = {
  id: string;
  path: string;
  build: (...params: string[]) => string;
};

const home: RouteType = {
  id: 'homeRoute',
  path: '/',
  build: () => '/',
};

const donation: RouteType = {
  id: 'donationRoute',
  path: '/donation',
  build: () => '/donation',
};

export const APP_ROUTES = Object.freeze({
  home,
  donation,
});
