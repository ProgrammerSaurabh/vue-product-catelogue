<template>
  <button
    v-if="loggedIn"
    class="btn btn-danger"
    :title="`Remove ${product.name} from cart`"
    @click="removeFrom(product.id)"
  >
    Remove from cart
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
    removeFrom(id) {
      let cartsData = { ...this.$store.state.carts };
      delete cartsData[id];
      this.$store.commit("updateCart", { ...cartsData });
    },
  },
};
</script>