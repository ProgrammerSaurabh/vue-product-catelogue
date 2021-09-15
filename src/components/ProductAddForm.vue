<template>
  <div class="px-2 pb-2">
    <h2 class="py-2">Add product</h2>
    <FormulateForm name="product-add" :values="product" @submit="addProduct">
      <FormulateInput
        type="text"
        name="name"
        validation="required"
        label="Product name"
      />
      <FormulateInput
        type="text"
        name="price"
        validation="required"
        label="Product price"
      />
      <FormulateInput
        type="url"
        name="image"
        validation="required"
        help="Image url to be added"
        label="Product image"
      />
      <FormulateInput type="submit" label="Add product" />
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
      this.$store.commit("products", [
        { ...data, id: this.$store.state.products.length + 1 },
        ...this.$store.state.products,
      ]);

      this.$formulate.reset("product-add");
    },
  },
};
</script>