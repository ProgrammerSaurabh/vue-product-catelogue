export const routes = [
  { path: "/", component: () => import("../components/Products") },
  {
    path: "/products/:id",
    component: () => import("../components/ProductDetail"),
  },
  {
    path: "/carts",
    component: () => import("../components/Carts"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login/callback",
    component: () => import("../components/Authorize"),
    meta: {
      guest: true,
    },
  },
];
