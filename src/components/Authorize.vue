<template>
  <div class="container text-center">
    <h1>{{ title }}</h1>
    <div class="loader" v-if="valid">
      <div class="animator"></div>
    </div>
    <h4>{{ text }}</h4>
    <Login @invalid="invalid" />
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
import Login from "./Login";

export default {
  components: { Login },
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
  methods: {
    invalid() {
      this.valid = false;
      this.title = "401";
      this.text = "Unauthorized";
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