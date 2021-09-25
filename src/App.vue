<template>
  <div id="app">
    <Navbar />
    <Login v-if="isElectron" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default {
  components: { Navbar, Login },
  data() {
    return { isElectron: false };
  },
  mounted() {
    if (process.env.IS_ELECTRON) {
      this.isElectron = true;
    }

    const this_ = this;

    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("_token");

      if (
        localStorage.getItem("loggedIn") &&
        localStorage.getItem("loggedIn") === "true" &&
        token
      ) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.response.use(
      (config) => config,
      (error) => {
        if (
          error.response.status === 401 &&
          localStorage.getItem("refresh_token")
        ) {
          this_.$store.dispatch("refreshToken");
        }
        throw error;
      }
    );
  },
};
</script>
