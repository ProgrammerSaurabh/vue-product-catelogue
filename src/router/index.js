import VueRouter from "vue-router";

const routes = [
  { path: "/", component: () => import(/* webpackChunkName: "Products" */"@/components/Products") },
  {
    path: "/products/:id",
    component: () => import(/* webpackChunkName: "ProductDetail" */"@/components/ProductDetail"),
  },
  {
    path: "/carts",
    component: () => import(/* webpackChunkName: "Carts" */"@/components/Carts"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login/callback",
    component: () => import(/* webpackChunkName: "Authorize" */"@/components/Authorize"),
    meta: {
      guest: true,
    },
  },
  { 
    path: '*', 
    component:  () => import(/* webpackChunkName: "NotFound" */"@/components/NotFound"),
  }
];

export const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if ("meta" in to) {
    // Logged in users not allowed for guest's routes
    if (
      "guest" in to.meta &&
      to.meta.guest &&
      localStorage.getItem("loggedIn") &&
      localStorage.getItem("loggedIn") === "true"
    ) {
      next("/");
    }

    // Only logged in users allowed
    if (
      "auth" in to.meta &&
      to.meta.auth &&
      !localStorage.getItem("loggedIn")
    ) {
      next("/");
    }
  }

  next();
});
