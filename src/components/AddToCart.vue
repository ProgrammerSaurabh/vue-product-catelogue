<template>
  <button
    class="btn btn-primary"
    :title="`Add ${product.name} to cart`"
    @click="addToCart(product)"
  >
    Add to cart
  </button>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
  },
};
</script>