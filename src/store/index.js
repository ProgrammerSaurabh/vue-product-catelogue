import axios from "axios";
import Cookies from "js-cookie";
import { callbackUrl } from "../helpers";

export const store = {
  state: {
    products: [],
    carts: {},
    loggedIn: false,
    _token: null,
    user: {},
  },
  getters: {
    cartsCount(state) {
      return Object.keys(state.carts).length;
    },
    name(state) {
      return state.loggedIn ? state.user.name : "Guest";
    },
    totalPrice(state) {
      let price = 0;
      for (const productId in state.carts) {
        if (Object.hasOwnProperty.call(state.carts, productId)) {
          price +=
            parseInt(state.carts[productId].quantity) *
            parseInt(state.carts[productId].price.replaceAll(",", ""));
        }
      }

      return price;
    },
    totalQuantity(state) {
      let quantity = 0;
      for (const productId in state.carts) {
        if (Object.hasOwnProperty.call(state.carts, productId)) {
          quantity += parseInt(state.carts[productId].quantity);
        }
      }

      return quantity;
    },
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
    user(state, user) {
      state.user = user;
    },
    updateCart(state, carts) {
      state.carts = carts;
    },
    addToCart(state, product) {
      if (state.loggedIn) {
        let cartsData = { ...state.carts };

        if (!Object.keys(cartsData).includes(product.id.toString())) {
          cartsData[product.id] = {
            ...product,
            quantity: 0,
          };
        }

        cartsData[product.id].quantity++;

        state.carts = cartsData;
      }
    },
    increaseCartQuantity(state, product) {
      state.carts[product.id].quantity++;
    },
    decreaseCartQuantity(state, product) {
      if (state.carts[product.id].quantity > 1) {
        state.carts[product.id].quantity--;
      }
    },
    removeFromCart(state, productId) {
      let carts = { ...state.carts };
      delete carts[productId];

      state.carts = carts;
    },
  },
  actions: {
    async loadProducts({ commit }) {
      try {
        const { data } = await axios.get("/products.json");

        commit("products", data.products);
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct({ state }, product) {
      state.products.unshift({ ...product, id: state.products.length + 1 });
    },
    checkAuth({ commit, dispatch }) {
      const token = Cookies.get("_token");

      if (!Cookies.get("loggedIn") || !token) {
        commit("loggedIn", false);
        commit("_token", null);
        commit("user", {});
        return;
      }

      if (
        Cookies.get("loggedIn") &&
        Cookies.get("loggedIn") === "true" &&
        token
      ) {
        commit("loggedIn", true);
        commit("_token", Cookies.get("_token"));
        dispatch("fetchUser");
      }
    },
    async fetchUser({ commit }) {
      try {
        const { data: user } = await axios.get(
          `${process.env.VUE_APP_API_URL}/oauth2/v1/userinfo`
        );

        commit("user", user);
      } catch (error) {
        console.log(error);
      }
    },
    refreshToken({ commit, dispatch }) {
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "refresh_token");
      urlencoded.append("client_id", process.env.VUE_APP_CLIENT_ID);
      urlencoded.append("redirect_uri", callbackUrl());
      urlencoded.append("refresh_token", Cookies.get("refresh_token"));

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencoded,
      };
      fetch(`${process.env.VUE_APP_API_URL}/oauth2/v1/token`, requestOptions)
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else {
            throw Error(res);
          }
        })
        .then((response) => {
          commit("_token", response.access_token);
          commit("loggedIn", true);

          Cookies.set("loggedIn", true);
          Cookies.set("_token", response.access_token);
          Cookies.set("expires_in", response.expires_in);
          Cookies.set("refresh_token", response.refresh_token);

          dispatch("fetchUser");
        })
        .catch((error) => {
          console.log("error", error);
          dispatch("clearData");
        });
    },
    clearData({ commit }) {
      [
        "loggedIn",
        "_token",
        "expires_in",
        "refresh_token",
        "auth-state",
        "code-verifier",
      ].forEach((key) => Cookies.remove(key));

      commit("loggedIn", false);
      commit("_token", null);
      commit("user", {});
      commit("updateCart", {});
    },
  },
};
