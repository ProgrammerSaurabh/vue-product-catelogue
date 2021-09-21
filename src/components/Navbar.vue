<template>
  <header>
    <nav class="container mt-0 bg-transparent">
      <router-link to="/">
        <h1>Products catalogue</h1>
      </router-link>
      <ul>
        <li v-if="!loggedIn" @click="login">Login</li>
        <li v-else class="drop-down">
          {{ user.name }}
          <ul class="drop-down-menu">
            <li @click="logout">
              <i class="fa fa-sign-out-alt"></i>&nbsp;Logout
            </li>
          </ul>
        </li>
        <li v-if="loggedIn">
          <router-link to="/carts">
            <div class="cart-container">
              <i class="fa fa-shopping-cart"></i>
              <span>
                {{ Object.keys(carts).length }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js/crypto-js";

export default {
  computed: {
    ...mapState(["carts", "loggedIn", "user"]),
  },
  methods: {
    callbackUrl() {
      return window.location.origin + "/login/callback";
    },
    codeChallege() {
      var verifier = Cookies.get("code-verifier");
      if (undefined == verifier) {
        verifier = this.randomString(58);
        Cookies.set("code-verifier", verifier);
      }
      return this.base64URL(CryptoJS.SHA256(verifier));
    },
    base64URL(string) {
      return string
        .toString(CryptoJS.enc.Base64)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
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
    login() {
      const a = document.createElement("a");

      if (!Cookies.get("auth-state")) {
        Cookies.set("auth-state", this.randomString(16));
      }

      const codeChallege = this.codeChallege();

      const state = Cookies.get("auth-state");

      a.href = `${process.env.VUE_APP_API_URL}/oauth2/v1/authorize?client_id=${
        process.env.VUE_APP_CLIENT_ID
      }&response_type=code&response_mode=query&scope=${[
        "offline_access",
        "openid",
        "profile",
      ].join(
        " "
      )}&redirect_uri=${this.callbackUrl()}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallege}`;

      a.click();
    },
    logout() {
      this.$store.dispatch("clearData");
    },
  },
};
</script>