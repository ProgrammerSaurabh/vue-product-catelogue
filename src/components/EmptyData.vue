<template>
  <div class="text-center">
    <img
      src="/images/no-products.svg"
      class="svg-img"
      alt="No products"
      title="No products"
      height="400"
    />
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: "No data found",
      type: String,
    },
  },
};
</script>