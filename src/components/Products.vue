<template>
  <div class="container">
    <ProductAddForm />
    <hr />
    <div v-if="products.length > 0" class="products__grid py-2">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
        data-testid="product"
      />
    </div>
    <EmptyData v-else text="No products" />
  </div>
</template>

<script>
import ProductAddForm from "./ProductAddForm";
import EmptyData from "./EmptyData";
import Product from "./Product";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Products",
  },
  components: {
    ProductAddForm,
    Product,
    EmptyData,
  },
  computed: {
    ...mapState(["products"]),
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