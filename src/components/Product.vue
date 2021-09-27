<template>
  <div class="product__card">
    <div class="product__image">
      <img :src="product.image" :alt="product.name" :title="product.name" />
      <div class="product__actions">
        <i
          class="fa fa-eye"
          title="View this product"
          @click="$router.push('/products/' + product.id)"
        ></i>
      </div>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    AddToCart: () =>
      import(/* webpackChunkName: "AddToCart" */ "@/components/AddToCart"),
    RemoveFromCart: () =>
      import(
        /* webpackChunkName: "RemoveFromCart" */ "@/components/RemoveFromCart"
      ),
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["carts"]),
    inCart() {
      return Object.keys(this.carts).includes(this.product.id.toString());
    },
    component() {
      return this.inCart ? "RemoveFromCart" : "AddToCart";
    },
  },
};
</script>