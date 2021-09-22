<template>
  <button
    v-if="loggedIn"
    class="btn btn-primary"
    :title="`Add ${product && product.name} to cart`"
    @click="addToCart(product)"
    data-testid="add-to-cart"
  >
    Add to cart
  </button>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loggedIn"]),
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    addToCart(product) {
      this.loggedIn && this.$store.commit("addToCart", product);
    },
  },
};
</script>