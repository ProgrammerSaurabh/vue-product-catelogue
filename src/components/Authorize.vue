<template>
  <div class="container text-center">
    <h1>{{ title }}</h1>
    <div class="loader" v-if="valid">
      <div class="animator"></div>
    </div>
    <h4>{{ text }}</h4>

    <button
      class="mt-2 btn btn-danger"
      v-if="!valid"
      @click="$router.push('/')"
    >
      Go back
    </button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loggedIn"]),
  },
  metaInfo: {
    title: "Authorizing",
  },
  data() {
    return {
      title: "Authorizing",
      text: "Please wait...",
      valid: true,
    };
  },
  mounted() {
    if (
      !this.$route.query ||
      Object.keys(this.$route.query).length == 0 ||
      !("state" in this.$route.query) ||
      this.$route.query.state !== Cookies.get("auth-state")
    ) {
      this.valid = false;
      this.title = "401";
      this.text = "Unauthorized";

      return;
    }

    if (!this.loggedIn) {
      this.getToken();
    }
  },
  methods: {
    randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    callbackUrl() {
      return window.location.origin + "/login/callback";
    },
    async getToken() {
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("client_id", process.env.VUE_APP_CLIENT_ID);
      urlencoded.append("redirect_uri", this.callbackUrl());
      urlencoded.append("code", this.$route.query.code);
      urlencoded.append("code_verifier", Cookies.get("code-verifier"));

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencoded,
      };

      const inst = this;

      await fetch(
        `${process.env.VUE_APP_API_URL}/oauth2/v1/token`,
        requestOptions
      )
        .then((response) => response.json())
        .then(function (result) {
          inst.$store.commit("loggedIn", true);
          inst.$store.commit("_token", result.access_token);
          Cookies.set("loggedIn", true);
          Cookies.set("_token", result.access_token);
          Cookies.set("expires_in", result.expires_in);
          Cookies.set("refresh_token", result.refresh_token);
          inst.$router.push("/");
        })
        .catch(function (error) {
          console.log("error", error);
          inst.valid = false;
          inst.title = "401";
          inst.text = "Unauthorized";
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
.loader {
  max-width: 80%;
  margin: 10px auto;
  height: 7px;
  background-color: #f6f6f6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.animator {
  position: absolute;
  top: 0px;
  left: 00%;
  right: 0px;
  height: 100%;
  width: 60%;
  background-color: #41b883;
  animation: loader 2.5s infinite ease-in-out;
}

@keyframes loader {
  from {
    left: -50%;
  }
  to {
    left: 100%;
  }
}
</style>