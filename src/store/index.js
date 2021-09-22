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
    async addProduct(context, product) {
      let products = context.state.products;
      context.commit("products", [
        { ...product, id: products + 1 },
        ...products,
      ]);
    },
    checkAuth(context) {
      const token = Cookies.get("_token");

      if (!Cookies.get("loggedIn") || !token) {
        context.commit("loggedIn", false);
        context.commit("_token", null);
        context.commit("user", {});
        return;
      }

      if (
        Cookies.get("loggedIn") &&
        Cookies.get("loggedIn") === "true" &&
        token
      ) {
        context.commit("loggedIn", true);
        context.commit("_token", Cookies.get("_token"));
      }
    },
    async fetchUser(context) {
      try {
        const { data: user } = await axios.get(
          `${process.env.VUE_APP_API_URL}/oauth2/v1/userinfo`
        );

        context.commit("user", user);
      } catch (error) {
        console.log(error);
      }
    },
    refreshToken(context) {
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
          context.commit("_token", response.access_token);
          context.commit("loggedIn", true);

          Cookies.set("loggedIn", true);
          Cookies.set("_token", response.access_token);
          Cookies.set("expires_in", response.expires_in);
          Cookies.set("refresh_token", response.refresh_token);

          context.dispatch("fetchUser");
        })
        .catch((error) => {
          console.log("error", error);
          context.dispatch("clearData");
        });
    },
    clearData(context) {
      [
        "loggedIn",
        "_token",
        "expires_in",
        "refresh_token",
        "auth-state",
        "code-verifier",
      ].forEach((key) => Cookies.remove(key));

      context.commit("loggedIn", false);
      context.commit("_token", null);
      context.commit("user", {});
      context.commit("updateCart", {});
    },
  },
};
