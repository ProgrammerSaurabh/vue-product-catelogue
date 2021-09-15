<template>
  <div class="container">
    <div class="px-2">
      <router-link to="/" class="btn btn-success">
        <h4>Back</h4>
      </router-link>
    </div>
    <div v-if="carts.length > 0" class="products__grid py-2">
      <Product v-for="(product) in carts" :key="product.id" :product="product" />
    </div>
    <div v-else class="text-center">
      <img
        src="/images/no-products.svg"
        class="svg-img"
        alt="No products"
        title="No products"
        height="400"
      />
      <h1>No products in cart</h1>
    </div>
  </div>
</template>

<script>
import Product from "./Product";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Carts",
  },
  components: {
    Product,
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