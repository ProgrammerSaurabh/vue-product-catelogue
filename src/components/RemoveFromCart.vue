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
      this.$store.commit("carts", [
        ...this.$store.state.carts.filter((cart) => cart.id != id),
      ]);
    },
  },
};
</script>