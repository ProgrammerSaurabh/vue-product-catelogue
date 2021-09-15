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
</template>

<script>
import { mapState } from "vuex";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

export default {
  components: { AddToCart, RemoveFromCart },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["carts"]),
    notInCart() {
      return !this.carts.map((cart) => cart.id).includes(this.product.id);
    },
  },
};
</script>