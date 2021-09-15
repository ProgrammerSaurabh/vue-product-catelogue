import axios from "axios";

export const store = {
  state: {
    products: [],
    carts: [],
  },
  mutations: {
    products(state, products) {
      state.products = products;
    },
    carts(state, carts) {
      state.carts = carts;
    },
  },
  actions: {
    async loadProducts(context) {
      try {
        const { data } = await axios.get("products.json");

        context.commit("products", data.products);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
