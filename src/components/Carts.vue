<template>
  <div class="container">
    <div class="px-2">
      <router-link to="/" class="btn btn-success">
        <h4>Back</h4>
      </router-link>
    </div>
    <div v-if="Object.keys(carts).length > 0" class="py-2">
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
        <tr v-for="product of carts" :key="product.id">
          <td>
            <img
              :src="product.image"
              :alt="product.name"
              :title="product.name"
              height="100"
            />
          </td>
          <td>
            <h1 class="product__title">{{ product.name }}</h1>
            <div class="product__price" :title="`Price is ${product.price}`">
              &#8377; {{ product.price }}
            </div>
          </td>
          <td>
            <div class="product_quantity">
              <button @click="decreaseQuantity(product)">
                <i class="fa fa-minus"></i>
              </button>
              <div class="product_quantity_box">{{ product.quantity }}</div>
              <button @click="increaseQuantity(product)">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </td>
          <td>
            <RemoveFromCart :product="product" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Total Price</td>
          <td>
            <h3>&#8377; {{ totalPrice }}</h3>
          </td>
        </tr>
      </table>
    </div>
    <EmptyData v-else text="No products in cart" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import EmptyData from "./EmptyData";
import RemoveFromCart from "./RemoveFromCart";

export default {
  metaInfo: {
    title: "Carts",
  },
  components: {
    EmptyData,
    RemoveFromCart,
  },
  computed: {
    ...mapState(["carts"]),
    totalPrice() {
      let price = 0;
      for (const productId in this.carts) {
        if (Object.hasOwnProperty.call(this.carts, productId)) {
          console.log(this.carts[productId].price.replaceAll(",", ""));
          price +=
            parseInt(this.carts[productId].quantity) *
            parseInt(this.carts[productId].price.replaceAll(",", ""));
        }
      }

      return price;
    },
  },
  methods: {
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        let cartsData = { ...this.$store.state.carts };

        cartsData[product.id].quantity--;

        this.$store.commit("updateCart", cartsData);
      }
    },
    increaseQuantity(product) {
      let cartsData = { ...this.$store.state.carts };

      cartsData[product.id].quantity++;

      this.$store.commit("updateCart", cartsData);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1092px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border-radius: 5px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.product__title {
  max-width: 60ch;
}

.product__price {
  display: inline-block;
}

.product_quantity {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product_quantity button {
  outline: none;
}

.product_quantity i {
  padding: 2px;
  background-color: #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.product_quantity_box {
  outline: none;
  padding: 5px;
  border: 1px solid #d2d2d2;
  width: 30px;
  text-align: center;
  margin: 0 5px;
}
</style>