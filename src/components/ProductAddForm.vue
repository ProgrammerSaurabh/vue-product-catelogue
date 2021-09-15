<template>
  <div class="px-2 pb-2">
    <h2 class="py-2">Add product</h2>
    <label for="name">Product Name</label>
    <input
      type="text"
      placeholder="Name"
      id="name"
      autofocus
      v-model="product.name"
    />
    <label for="price">Product price</label>
    <input
      type="text"
      placeholder="Price in ₹"
      id="price"
      v-model="product.price"
    />
    <label for="price">Product image</label>
    <input
      type="text"
      placeholder="Image url"
      id="image"
      v-model="product.image"
    />
    <button
      type="button"
      class="btn btn-success"
      id="js-product-add-btn"
      title="Add product`"
      @click="addProduct"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: "",
        price: "",
        image: "",
      },
    };
  },
  methods: {
    removeErrors() {
      Object.keys(this.product).forEach((key) => {
        this.$el.querySelector(`#${key}`).classList.remove("error");
      });
    },
    addErrors(keys) {
      keys.forEach((key) => {
        this.$el.querySelector(`#${key}`).classList.add("error");
      });
    },
    clearData() {
      this.product = {
        name: "",
        price: "",
        image: "",
      };
    },
    validateData() {
      let keys = [];
      if (this.product.name.length == 0) {
        keys.push("name");
      }
      if (this.product.price.length == 0) {
        keys.push("price");
      }
      if (this.product.image.length == 0) {
        keys.push("image");
      }

      return keys;
    },
    addProduct() {
      this.$el
        .querySelector("#js-product-add-btn")
        .setAttribute("disabled", "disabled");

      this.removeErrors();

      const keys = this.validateData();

      if (keys.length > 0) {
        this.$el
          .querySelector("#js-product-add-btn")
          .removeAttribute("disabled");
        this.addErrors(keys);
        return;
      }

      this.$store.commit("products", [
        { ...this.product, id: this.$store.state.products.length + 1 },
        ...this.$store.state.products,
      ]);

      this.$el.querySelector("#js-product-add-btn").removeAttribute("disabled");

      this.clearData();
    },
  },
};
</script>

<style>
</style>