<template>
  <div class="container">
    <ProductAddForm />
    <hr />
    <div v-if="products.length > 0" class="products__grid py-2">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
        @editProduct="
          (data) => {
            editProduct = data;
          }
        "
      />
    </div>
    <div v-else class="text-center">
      <img
        src="/images/no-products.svg"
        class="svg-img"
        alt="No products"
        title="No products"
        height="400"
      />
      <h1>No products</h1>
    </div>
  </div>
</template>

<script>
import ProductAddForm from "./ProductAddForm";
import Product from "./Product";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Products",
  },
  components: {
    ProductAddForm,
    Product,
  },
  computed: {
    ...mapState(["products"]),
  },
  data() {
    return {
      editProduct: null,
    };
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