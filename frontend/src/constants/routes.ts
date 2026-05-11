export const API_ROUTES = {
  RESTAURANTS: {
    BASE: '/restaurant',
    GET_ALL: '/restaurant/get-all',
    CREATE: '/restaurant',
    UPDATE: (id: string) => `/restaurant/${id}`,
    DELETE: (id: string) => `/restaurant/${id}`,
  },
};

export const APP_ROUTES = {
  HOME: '/',
  RESTAURANTS: '/restaurants',
};
