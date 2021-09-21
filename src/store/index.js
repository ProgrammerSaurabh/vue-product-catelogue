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
    checkAuth(context) {
      if (!Cookies.get("loggedIn")) {
        context.commit("loggedIn", false);
        context.commit("_token", null);
        return;
      }

      if (Cookies.get("loggedIn") && Cookies.get("loggedIn") === "true") {
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
      return new Promise((resolve, reject) => {
        try {
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

          fetch(
            `${process.env.VUE_APP_API_URL}/oauth2/v1/token`,
            requestOptions
          )
            .then((response) => response.json())
            .then(function(result) {
              context.commit("_token", result.access_token);
              Cookies.set("loggedIn", true);
              Cookies.set("_token", result.access_token);
              Cookies.set("expires_in", result.expires_in);
              Cookies.set("refresh_token", result.refresh_token);

              return resolve(result);
            })
            .catch(function(error) {
              console.log("error", error);
            });
        } catch (error) {
          console.log(error);
          return reject(error);
        }
      });
    },
  },
};
