import axios from "axios";

export const store = {
  state: {
    products: [],
    carts: {},
  },
  mutations: {
    products(state, products) {
      state.products = products;
    },
    updateCart(state, carts) {
      state.carts = carts;
    },
    addToCart(state,product){
      let cartsData = {...state.carts}
      
      if(!Object.keys(cartsData).includes(product.id)){
        cartsData[product.id] = {
          ...product,
          quantity: 0
        }
      }

      cartsData[product.id].quantity++

      state.carts = cartsData
    }
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
