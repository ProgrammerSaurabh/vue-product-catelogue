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
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";

export default {
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

    this.getToken();
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
      try {
        const { data: response } = await fetch(
          `${process.env.VUE_APP_API_URL}/oauth2/v1/token`,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              grant_type: "authorization_code",
              client_id: process.env.VUE_APP_CLIENT_ID,
              redirect_uri: this.callbackUrl(),
              code: this.$route.query.code,
              code_verifier: Base64.stringify(sha256(this.randomString(43))),
            }),
          }
        );

        console.log(response);
      } catch (error) {
        this.valid = false;
        this.title = "401";
        this.text = "Unauthorized";
      }
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