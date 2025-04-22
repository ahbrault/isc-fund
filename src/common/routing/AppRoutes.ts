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

const donate: RouteType = {
  id: 'donateRoute',
  path: '/donate',
  build: () => '/donate',
};

export const APP_ROUTES = Object.freeze({
  home,
  donate,
});
