import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import VueFormulate from "@braid/vue-formulate";

import { store } from "./store";
import { router } from "./router";

import "/src/assets/styles.css";

Vue.config.productionTip = false;

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
