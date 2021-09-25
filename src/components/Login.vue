<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
import { callback } from "../helpers";

export default {
  data() {
    return {
      code: null,
      state: null,
    };
  },
  computed: {
    ...mapState(["loggedIn"]),
  },
  mounted() {
    if (!process.env.IS_ELECTRON) {
      if (this.$route.query && Object.keys(this.$route.query).length > 0) {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
      }
    } else {
      let query = new URLSearchParams(window.location.search);
      for (let q of query) {
        this[q[0]] = q[1];
      }
    }

    this.validateState();
  },
  methods: {
    validateState() {
      if (this.state != localStorage.getItem("auth-state")) {
        return this.$emit("invalid");
      }

      if (!this.loggedIn) {
        this.getToken();
      }
    },
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
    async getToken() {
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("client_id", process.env.VUE_APP_CLIENT_ID);
      urlencoded.append("redirect_uri", callback());
      urlencoded.append("code", this.code);
      urlencoded.append("code_verifier", localStorage.getItem("code-verifier"));

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
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("_token", result.access_token);
          localStorage.setItem("expires_in", result.expires_in);
          localStorage.setItem("refresh_token", result.refresh_token);

          inst.$store.dispatch("fetchUser");

          inst.$router.push("/").catch(() => {});
        })
        .catch(function (error) {
          console.log("error", error);
          inst.$emit("invalid");
        });
    },
  },
};
</script>