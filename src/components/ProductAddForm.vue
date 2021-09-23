<template>
  <div class="px-2 pb-2">
    <h2 class="py-2">Add product</h2>
    <FormulateForm name="product-add" @submit="addProduct">
      <FormulateInput
        type="text"
        name="name"
        validation="required"
        label="Product name"
        v-model="product.name"
        data-testid="product-name"
      />
      <FormulateInput
        type="text"
        name="price"
        validation="required"
        label="Product price"
        v-model="product.price"
        data-testid="product-price"
      />
      <FormulateInput
        type="url"
        name="image"
        validation="required"
        help="Image url to be added"
        label="Product image"
        v-model="product.image"
        data-testid="product-image"
      />
      <FormulateInput
        data-testid="product-add-button"
        type="button"
        @click="$formulate.submit('product-add')"
        label="Add product"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  metaInfo: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@braid/vue-formulate@2.5.2/dist/snow.css",
      },
    ],
  },
  data() {
    return {
      product: {
        name: null,
        price: null,
        image: null,
      },
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch("addProduct", this.product);
      this.$formulate.reset("product-add");
    },
  },
};
</script>