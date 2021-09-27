<template>
  <div class="container">
    <div class="px-2">
      <router-link to="/" class="btn btn-success">
        <h4>Back</h4>
      </router-link>
    </div>
    <div v-if="product">
      <div class="product__detail">
        <div class="product__image">
          <img :src="product.image" :alt="product.name" :title="product.name" />
        </div>
        <div class="product__content">
          <h1 class="product__title" data-testid="product-name">
            {{ product.name }}
          </h1>
          <div class="product__description">
            <div class="product__price" :title="`Price is ${product.price}`">
              &#8377; {{ product.price }}
            </div>
            <component :is="component" :product="product"></component>
          </div>
        </div>
      </div>
    </div>
    <EmptyData v-else text="No product found" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    AddToCart: () => import(/* webpackChunkName: "AddToCart" */ "./AddToCart"),
    RemoveFromCart: () =>
      import(/* webpackChunkName: "RemoveFromCart" */ "./RemoveFromCart"),
    EmptyData: () => import(/* webpackChunkName: "EmptyData" */ "./EmptyData"),
  },
  computed: {
    ...mapState(["products", "carts"]),
    product() {
      return this.products.find(
        (product) => product.id == this.$route.params.id
      );
    },
    inCart() {
      return Object.keys(this.carts).includes(this.product.id.toString());
    },
    component() {
      return this.inCart ? "RemoveFromCart" : "AddToCart";
    },
  },
};
</script>