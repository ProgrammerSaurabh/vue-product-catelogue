import axios from "axios";
import Cookies from "js-cookie";

export const store = {
  state: {
    products: [],
    carts: {},
    loggedIn: false,
    _token: null,
  },
  mutations: {
    products(state, products) {
      state.products = products;
    },
    loggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    _token(state, _token) {
      state._token = _token;
    },
    updateCart(state, carts) {
      state.carts = carts;
    },
    addToCart(state, product) {
      let cartsData = { ...state.carts };

      if (!Object.keys(cartsData).includes(product.id)) {
        cartsData[product.id] = {
          ...product,
          quantity: 0,
        };
      }

      cartsData[product.id].quantity++;

      state.carts = cartsData;
    },
  },
  actions: {
    async loadProducts(context) {
      try {
        const { data } = await axios.get("/products.json");

        context.commit("products", data.products);
      } catch (error) {
        console.log(error);
      }
    },
    checkAuth(context) {
      if (!Cookies.get("loggedIn")) {
        context.commit("loggedIn", false);
        return;
      }

      if (Cookies.get("loggedIn") && Cookies.get("loggedIn") === "true") {
        context.commit("loggedIn", true);
      }
    },
  },
};
