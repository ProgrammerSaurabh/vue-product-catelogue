import Cookies from "js-cookie";
import VueRouter from "vue-router";

const routes = [
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

export const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if ("meta" in to) {
    // Logged in users not allowed for guest's routes
    if (
      "guest" in to.meta &&
      to.meta.guest &&
      Cookies.get("loggedIn") &&
      Cookies.get("loggedIn") === "true"
    ) {
      next("/");
    }

    // Only logged in users allowed
    if ("auth" in to.meta && to.meta.auth && !Cookies.get("loggedIn")) {
      next("/");
    }
  }

  next();
});
