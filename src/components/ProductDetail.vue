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
          <h1 class="product__title">{{ product.name }}</h1>
          <div class="product__description">
            <div class="product__price" :title="`Price is ${product.price}`">
              &#8377; {{ product.price }}
            </div>
            <AddToCart :product="product" v-if="notInCart" />
            <RemoveFromCart :product="product" v-else />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <img
        src="/images/no-products.svg"
        class="svg-img"
        alt="No products"
        title="No products"
        height="400"
      />
      <h1>No product found</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

export default {
  components: { AddToCart, RemoveFromCart },
  computed: {
    ...mapState(["products", "carts"]),
    product() {
      return this.products.find(
        (product) => product.id == this.$route.params.id
      );
    },
    notInCart() {
      return !this.carts.map((cart) => cart.id).includes(this.product.id);
    },
  },
};
</script>