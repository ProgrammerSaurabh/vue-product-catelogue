<template>
  <div class="px-2 pb-2">
    <h2 class="py-2">Add product</h2>
    <FormulateForm name="product-add" :values="product" @submit="addProduct">
      <FormulateInput
        type="text"
        name="name"
        validation="required"
        label="Product name"
        data-testid="product-name"
      />
      <FormulateInput
        type="text"
        name="price"
        validation="required"
        label="Product price"
        data-testid="product-price"
      />
      <FormulateInput
        type="url"
        name="image"
        validation="required"
        help="Image url to be added"
        label="Product image"
        data-testid="product-image"
      />
      <FormulateInput
        data-testid="product-add-button"
        type="submit"
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
      product: {},
    };
  },
  methods: {
    addProduct(data) {
      this.$store.dispatch("addProduct", data);

      this.$formulate.reset("product-add");
    },
  },
};
</script>