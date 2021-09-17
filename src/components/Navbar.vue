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
import { MD5 } from "crypto-js";
import Cookies from "js-cookie";

export default {
  computed: {
    ...mapState(["carts"]),
  },
  methods: {
    generateRandomString() {
      return MD5(new Date().getTime());
    },
    callbackUrl() {
      return window.location.origin + "/login/callback";
    },
    login() {
      const a = document.createElement("a");

      Cookies.set("auth-state", this.generateRandomString());
      const state = Cookies.get("auth-state");

      a.href = `${process.env.VUE_APP_API_URL}/oauth2/v1/authorize?client_id=${
        process.env.VUE_APP_CLIENT_ID
      }&response_type=code&response_mode=query&scope=offline_access&redirect_uri=${this.callbackUrl()}&state=${state}&code_challenge_method=S256&code_challenge=${state}`;

      a.click();
    },
  },
};
</script>