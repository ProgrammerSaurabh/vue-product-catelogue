import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import Carts from "@/components/Carts";
import EmptyData from "@/components/EmptyData";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

describe("Carts", () => {
  const store = new Vuex.Store(Store);

  let product;

  beforeEach(async () => {
    await store.commit("products", products);
    await store.commit("loggedIn", false);
    await store.commit("updateCart", {});
    product = store.state.products[0];
  });

  it("should show empty div if no data available", () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    expect(wrapper.findComponent(EmptyData).exists()).toBeTruthy();
  });

  it("should show table if data available", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    await store.commit("loggedIn", true);
    await store.commit("addToCart", product);

    expect(wrapper.find("[data-testid='cart-table']").exists()).toBeTruthy();
  });

  it("should show product row in table", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    const products_ = [
      store.state.products[0],
      store.state.products[1],
      store.state.products[2],
    ];

    await store.commit("loggedIn", true);
    await store.commit("addToCart", products_[0]);
    await store.commit("addToCart", products_[1]);
    await store.commit("addToCart", products_[2]);

    const randomProduct = products_[randomIndex(products_)];

    expect(
      wrapper.find(`[data-testid='product-row-${randomProduct.id}']`).exists()
    ).toBeTruthy();
  });

  it("should show product name in table", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    const products_ = [
      store.state.products[0],
      store.state.products[1],
      store.state.products[2],
    ];

    await store.commit("loggedIn", true);
    await store.commit("addToCart", products_[0]);
    await store.commit("addToCart", products_[1]);
    await store.commit("addToCart", products_[2]);

    const randomProduct = products_[randomIndex(products_)];

    expect(
      wrapper.find(`[data-testid='product-name-${randomProduct.id}']`).text()
    ).toEqual(randomProduct.name);
  });

  it("should increase product quantity", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    const products_ = [
      store.state.products[0],
      store.state.products[1],
      store.state.products[2],
    ];

    await store.commit("loggedIn", true);
    await store.commit("addToCart", products_[0]);
    await store.commit("addToCart", products_[1]);
    await store.commit("addToCart", products_[2]);

    const randomProduct = products_[randomIndex(products_)];

    expect(store.state.carts[randomProduct.id].quantity).toEqual(1);

    await wrapper
      .find(`[data-testid='product-increase-quantity-${randomProduct.id}']`)
      .trigger("click");

    expect(store.state.carts[randomProduct.id].quantity).toEqual(2);
  });

  it("should decrease product quantity", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    const products_ = [
      store.state.products[0],
      store.state.products[1],
      store.state.products[2],
    ];

    await store.commit("loggedIn", true);
    await store.commit("addToCart", products_[0]);
    await store.commit("addToCart", products_[1]);
    await store.commit("addToCart", products_[2]);

    const randomProduct = products_[randomIndex(products_)];

    await wrapper
      .find(`[data-testid='product-increase-quantity-${randomProduct.id}']`)
      .trigger("click");

    await wrapper
      .find(`[data-testid='product-increase-quantity-${randomProduct.id}']`)
      .trigger("click");

    expect(store.state.carts[randomProduct.id].quantity).toEqual(3);

    await wrapper
      .find(`[data-testid='product-decrease-quantity-${randomProduct.id}']`)
      .trigger("click");

    expect(store.state.carts[randomProduct.id].quantity).toEqual(2);

    await wrapper
      .find(`[data-testid='product-decrease-quantity-${randomProduct.id}']`)
      .trigger("click");

    expect(store.state.carts[randomProduct.id].quantity).toEqual(1);

    await wrapper
      .find(`[data-testid='product-decrease-quantity-${randomProduct.id}']`)
      .trigger("click");

    expect(store.state.carts[randomProduct.id].quantity).toEqual(1);
  });

  it("should remove product", async () => {
    const wrapper = mount(Carts, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    const products_ = [
      store.state.products[0],
      store.state.products[1],
      store.state.products[2],
    ];

    await store.commit("loggedIn", true);
    await store.commit("addToCart", products_[0]);
    await store.commit("addToCart", products_[1]);
    await store.commit("addToCart", products_[2]);

    const randomProduct = products_[randomIndex(products_)];

    expect(
      wrapper.find(`[data-testid='product-row-${randomProduct.id}']`).exists()
    ).toBeTruthy();

    await wrapper
      .find(`[data-testid='product-remove-${randomProduct.id}']`)
      .trigger("click");

    expect(
      wrapper.find(`[data-testid='product-row-${randomProduct.id}']`).exists()
    ).toBeFalsy();
  });
});
