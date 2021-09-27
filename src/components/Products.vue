<template>
  <div class="container">
    <ProductAddForm />
    <hr />
    <div v-if="loader" class="text-center py-2">
      <div class="loader"></div>
      <h2>Loading products...</h2>
    </div>
    <div v-else>
      <div v-if="products.length > 0" class="products__grid py-2">
        <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-else>
        <EmptyData text="No products" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Products",
  },
  components: {
    ProductAddForm: () =>
      import(/* webpackChunkName: "ProductAddForm" */ "./ProductAddForm"),
    EmptyData: () => import(/* webpackChunkName: "EmptyData" */ "./EmptyData"),
    Product: () => import(/* webpackChunkName: "Product" */ "./Product"),
  },
  data() {
    return {
      loader: true,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  async mounted() {
    if (!process.env.JEST_WORKER_ID) {
      this.loader = true;
      await this.$store.dispatch("loadProducts");
      this.loader = false;
    }
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