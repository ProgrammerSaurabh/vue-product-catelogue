<template>
  <div class="container text-center">
    <h1>404</h1>
    <h4>Not found</h4>
    <button class="mt-2 btn btn-danger" @click="$router.push('/')">
      Home
    </button>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "404",
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
</style>
