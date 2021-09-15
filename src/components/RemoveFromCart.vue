<template>
  <button
    class="btn btn-danger"
    :title="`Remove ${product.name} from cart`"
    @click="removeFrom(product.id)"
  >
    Remove from cart
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
    removeFrom(id) {
      let cartsData = { ...this.$store.state.carts };
      delete cartsData[id];
      this.$store.commit("updateCart", { ...cartsData });
    },
  },
};
</script>