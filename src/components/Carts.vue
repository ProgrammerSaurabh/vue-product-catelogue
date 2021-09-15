<template>
  <div class="container">
    <div class="px-2">
      <router-link to="/" class="btn btn-success">
        <h4>Back</h4>
      </router-link>
    </div>
    <div v-if="carts.length > 0" class="products__grid py-2">
      <Product v-for="product in carts" :key="product.id" :product="product" />
    </div>
    <EmptyData v-else text="No products in cart" />
  </div>
</template>

<script>
import Product from "./Product";
import { mapState } from "vuex";
import EmptyData from "./EmptyData";

export default {
  metaInfo: {
    title: "Carts",
  },
  components: {
    Product,
    EmptyData,
  },
  computed: {
    ...mapState(["carts"]),
  },
};
</script>

<style scoped>
.products__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>