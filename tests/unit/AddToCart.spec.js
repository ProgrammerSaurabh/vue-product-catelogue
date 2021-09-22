import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { store as Store } from "../../src/store";
import { products } from "../../public/products.json";
import AddToCart from "../../src/components/AddToCart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddToCart", () => {
  const store = new Vuex.Store(Store);

  beforeEach(async () => {
    await store.commit("products", products);
  });

  it("doesn't show add-to-cart button when not loggedIn", () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product: {
        name: "Product1",
        id: 10,
      },
    });

    store.commit("loggedIn", false);

    expect(wrapper.isVisible()).toBe(false);
  });

  it("show add-to-cart button when loggedIn", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product: {
        name: "Product1",
        id: 10,
      },
    });

    await store.commit("loggedIn", true);

    expect(wrapper.isVisible()).toBe(true);
  });

  it("should add product to store", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product: {
        name: "Product1",
        id: 10,
      },
    });

    await store.commit("loggedIn", true);

    expect(10 in store.state.carts).toBe(false);

    await wrapper.find("[data-testid='add-to-cart']").trigger("click");

    expect(10 in store.state.carts).toBe(true);
  });
});
