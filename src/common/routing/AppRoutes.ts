export type RouteType = {
  id: string;
  path: string;
  build: (...params: (string | number)[]) => string;
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

const thankYou: RouteType = {
  id: 'thankYouRoute',
  path: '/thank-you',
  build: () => '/thank-you',
};

const eventBookTable: RouteType = {
  id: 'eventBookTableRoute',
  path: '/events/:slug/book-table',
  build: (slug: string | number) => `/events/${slug}/book-table`,
};

const auction: RouteType = {
  id: 'auctionRoute',
  path: '/auction',
  build: () => '/auction',
};

const auctionLot: RouteType = {
  id: 'auctionLotRoute',
  path: '/auction/lot-:id',
  build: (id: number | string) => `/auction/lot-${id}`,
};

const auctionTerms: RouteType = {
  id: 'auctionTermsRoute',
  path: '/auction/terms',
  build: () => '/auction/terms',
};

export const APP_ROUTES = Object.freeze({
  home,
  donate,
  thankYou,
  eventBookTable,
  auction,
  auctionLot,
  auctionTerms,
});
