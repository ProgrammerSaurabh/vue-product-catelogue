import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import VueFormulate from "@braid/vue-formulate";

import Cookies from "js-cookie";

import { store } from "./store";
import { router } from "./router";

import "/src/assets/styles.css";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
  const token = Cookies.get("_token");

  if (Cookies.get("loggedIn") && Cookies.get("loggedIn") === "true" && token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (config) => config,
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error(`Unauthenticated`);
    }
    throw error;
  }
);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueFormulate);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

new Vue({
  render: (h) => h(App),
  computed: Vuex.mapState(["loggedIn"]),
  methods: Vuex.mapActions(["loadProducts", "checkAuth", "fetchUser"]),
  store: new Vuex.Store(store),
  router,
  mounted() {
    this.loadProducts();
    this.checkAuth();
    this.loggedIn && this.fetchUser();
  },
}).$mount("#app");
