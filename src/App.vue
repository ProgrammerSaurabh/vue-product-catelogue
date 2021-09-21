<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  components: { Navbar },
  async mounted() {
    const this_ = this;

    axios.interceptors.request.use((config) => {
      const token = Cookies.get("_token");

      if (
        Cookies.get("loggedIn") &&
        Cookies.get("loggedIn") === "true" &&
        token
      ) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.response.use(
      (config) => config,
      async (error) => {
        if (error.response.status === 401) {
          await this_.$store.dispatch("refreshToken");
          await this_.$store.dispatch("fetchUser");
        }
        throw error;
      }
    );
  },
};
</script>
