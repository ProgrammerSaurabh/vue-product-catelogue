<template>
  <header>
    <nav class="container mt-0 bg-transparent">
      <router-link to="/">
        <h1>Products catalogue</h1>
      </router-link>
      <ul>
        <li @click="login">Login</li>
        <!-- <li>Logout</li> -->
        <li>
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
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";

export default {
  computed: {
    ...mapState(["carts"]),
  },
  methods: {
    callbackUrl() {
      return window.location.origin + "/login/callback";
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

      Cookies.set("auth-state", this.randomString(16));
      Cookies.set("code-verifier", this.randomString(43));
      const state = Cookies.get("auth-state");
      const verifier = Cookies.get("code-verifier");

      a.href = `${process.env.VUE_APP_API_URL}/oauth2/v1/authorize?client_id=${
        process.env.VUE_APP_CLIENT_ID
      }&response_type=code&response_mode=query&scope=offline_access&redirect_uri=${this.callbackUrl()}&state=${state}&code_challenge_method=S256&code_challenge=${Base64.stringify(
        sha256(verifier)
      )}`;

      a.click();
    },
  },
};
</script>