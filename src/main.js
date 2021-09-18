import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import VueFormulate from "@braid/vue-formulate";

import { store } from "./store";
import { routes } from "./routes";

import Cookies from "js-cookie";

import "/src/assets/styles.css";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueFormulate);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if ("meta" in to) {
    if (
      "guest" in to.meta &&
      to.meta.guest &&
      Cookies.get("loggedIn") &&
      Cookies.get("loggedIn") === "true"
    ) {
      next("/");
    }
    if ("auth" in to.meta && to.meta.auth && !Cookies.get("loggedIn")) {
      next("/");
    }
  }

  next();
});

new Vue({
  render: (h) => h(App),
  methods: Vuex.mapActions(["loadProducts", "checkAuth"]),
  store: new Vuex.Store(store),
  router,
  mounted() {
    this.loadProducts();
    this.checkAuth();
  },
}).$mount("#app");
